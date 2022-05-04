export interface DataTableProps {
	rowData: any[];
	tableTitle: string;
	page: number;
	rowsPerPageHOC: number;
	setPage: any;
	deleting: boolean;
	deleteAction: Function;
	addAction: Function;
	editAction: Function;
}
