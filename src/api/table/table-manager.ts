export type ColumnDefaultGetters<T> = Array<() => T>;

export type ColumnValue = number | string;

export type Row = Array<ColumnValue>;

type InferTupleFromReturns<T extends ReadonlyArray<() => unknown>> = { [K in keyof T]: T[K] extends () => infer R ? R : T[K] }

export class TableManager<TColumnNames extends string[]> {
    private readonly _defaultValueGetters: ColumnDefaultGetters<ColumnValue>;
    private readonly _columnNameToIndex: Map<string, number>;
    private readonly _columnNames: string[];
    private readonly _rows = new Map<number, Row>();
    private _currentRowId: number = Number.MIN_SAFE_INTEGER;

    constructor(columnNames: [...TColumnNames], defaultValueGetters: ColumnDefaultGetters<ColumnValue>) {
        this._columnNames = columnNames;
        this._defaultValueGetters = defaultValueGetters;
        this._columnNameToIndex = new Map();
        for (let i = 0; i < columnNames.length; ++i) {
            this._columnNameToIndex.set(columnNames[i], i);
        }
    }

    private _createDefaultRow(): Row {
        return this._defaultValueGetters.map(getter => getter());
    }

    private _resolveIndex(column: string | number) {
        if (typeof column === 'string') {
            const index = this._columnNameToIndex.get(column);
            if (!index) {
                throw new Error('Invalid column name');
            }
            column = index;
        }
        return column;
    }

    private _resolveRow(id: number) {
        const row = this._rows.get(id);
        if (!row) {
            throw new Error('Invalid row id');
        }
        return row;
    }

    private _resolveColumn(id: number, column: string | number) {
        const row = this._resolveRow(id);
        const resolvedColumn = this._resolveIndex(column);
        if (resolvedColumn >= row.length) {
            throw new Error('column is out of range');
        }
        return row[resolvedColumn];
    }

    addRow(initialValues: Row = this._createDefaultRow()) {
        const rowId = this._currentRowId++;
        this._rows.set(rowId, initialValues);
        return rowId;
    }

    removeRow(id: number) {
        this._rows.delete(id);
    }

    updateColumn(id: number, column: number | string, value: ColumnValue) {
        const row = this._resolveRow(id);
        const resolvedColumn = this._resolveIndex(column);

        if (resolvedColumn >= row.length) {
            throw new Error('Index out of range of row');
        }

        row[resolvedColumn] = value;
    }

    replaceRow(id: number, values: Row) {
        this._resolveRow(id);
        this._rows.set(id, values);
    }

    getRow(id: number) {
        return this._resolveRow(id);
    }

    getColumn(id: number, column: string | number) {
        return this._resolveColumn(id, column);
    }

    getColumnName(columnIndex: number) {
        return this._columnNames[columnIndex];
    }

    getRowIds() {
        return this._rows.keys();
    }
}
