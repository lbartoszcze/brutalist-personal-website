import React, { useState, useMemo } from 'react';

interface Column<T> {
  id: string;
  header: React.ReactNode;
  accessor: (row: T) => any;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  renderCell?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField?: keyof T | ((row: T) => string);
  variant?: 'default' | 'bordered' | 'cutout';
  size?: 'small' | 'medium' | 'large';
  striped?: boolean;
  hoverable?: boolean;
  sortable?: boolean;
  defaultSortColumn?: string;
  defaultSortDirection?: 'asc' | 'desc';
  onRowClick?: (row: T) => void;
  emptyState?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  cellClassName?: string | ((column: Column<T>, row: T, index: number) => string);
}

type SortDirection = 'asc' | 'desc' | null;

export function Table<T extends object>({
  columns,
  data,
  keyField,
  variant = 'default',
  size = 'medium',
  striped = false,
  hoverable = false,
  sortable = false,
  defaultSortColumn,
  defaultSortDirection = 'asc',
  onRowClick,
  emptyState,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  rowClassName = '',
  cellClassName = '',
}: TableProps<T>) {
  // State for sorting
  const [sortColumn, setSortColumn] = useState<string | null>(defaultSortColumn || null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    defaultSortColumn ? defaultSortDirection : null
  );
  
  // Get key for row
  const getRowKey = (row: T, index: number): string => {
    if (typeof keyField === 'function') {
      return keyField(row);
    }
    
    if (keyField && row[keyField] !== undefined) {
      return String(row[keyField]);
    }
    
    // Fallback to index if no keyField provided
    return `row-${index}`;
  };
  
  // Handle header click for sorting
  const handleHeaderClick = (column: Column<T>) => {
    if (!sortable || !column.sortable) return;
    
    let newDirection: SortDirection = 'asc';
    
    if (sortColumn === column.id) {
      newDirection = sortDirection === 'asc' ? 'desc' : 
                     sortDirection === 'desc' ? null : 'asc';
    }
    
    setSortColumn(newDirection === null ? null : column.id);
    setSortDirection(newDirection);
  };
  
  // Get sorted data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;
    
    const column = columns.find(col => col.id === sortColumn);
    if (!column) return data;
    
    return [...data].sort((a, b) => {
      const valA = column.accessor(a);
      const valB = column.accessor(b);
      
      if (valA === valB) return 0;
      
      const comparison = valA > valB ? 1 : -1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortColumn, sortDirection, columns]);
  
  // Get variant-based styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Get size-based styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          cell: 'py-1 px-2 text-sm',
          header: 'py-2 px-2 text-sm',
        };
      case 'large':
        return {
          cell: 'py-4 px-6 text-lg',
          header: 'py-4 px-6 text-lg',
        };
      default: // medium
        return {
          cell: 'py-3 px-4',
          header: 'py-3 px-4',
        };
    }
  };
  
  // Get alignment class
  const getAlignmentClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };
  
  // Get row class
  const getRowClass = (row: T, index: number) => {
    let baseClass = 'border-b border-black last:border-b-0';
    
    if (hoverable) {
      baseClass += ' hover:bg-gray-100';
    }
    
    if (striped && index % 2 !== 0) {
      baseClass += ' bg-gray-50';
    }
    
    if (onRowClick) {
      baseClass += ' cursor-pointer';
    }
    
    if (typeof rowClassName === 'function') {
      return `${baseClass} ${rowClassName(row, index)}`;
    }
    
    return `${baseClass} ${rowClassName}`;
  };
  
  // Get cell class
  const getCellClass = (column: Column<T>, row: T, index: number) => {
    const baseClass = `${getSizeStyles().cell} ${getAlignmentClass(column.align)}`;
    
    if (typeof cellClassName === 'function') {
      return `${baseClass} ${cellClassName(column, row, index)}`;
    }
    
    return `${baseClass} ${cellClassName}`;
  };
  
  // Render empty state if no data
  if (data.length === 0) {
    return (
      <div className={`${getVariantStyles()} ${className}`}>
        <div className="p-8 text-center font-mono">
          {emptyState || (
            <p>No data available</p>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`overflow-x-auto ${getVariantStyles()} ${className}`}>
      <table className="w-full border-collapse">
        <thead className={`bg-black text-white font-mono ${headerClassName}`}>
          <tr>
            {columns.map(column => (
              <th 
                key={column.id}
                className={`
                  ${getSizeStyles().header}
                  ${getAlignmentClass(column.align)}
                  ${(sortable && column.sortable) ? 'cursor-pointer select-none' : ''}
                  border-r border-white last:border-r-0
                `}
                onClick={() => handleHeaderClick(column)}
                style={{ width: column.width }}
              >
                <div className="flex items-center justify-between">
                  <span>{column.header}</span>
                  {sortable && column.sortable && sortColumn === column.id && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : sortDirection === 'desc' ? '↓' : ''}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={bodyClassName}>
          {sortedData.map((row, rowIndex) => (
            <tr 
              key={getRowKey(row, rowIndex)}
              className={getRowClass(row, rowIndex)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((column, colIndex) => {
                const value = column.accessor(row);
                return (
                  <td
                    key={column.id}
                    className={`${getCellClass(column, row, rowIndex)} border-r border-gray-200 last:border-r-0`}
                  >
                    {column.renderCell ? column.renderCell(value, row) : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Data table with pagination
interface DataTableProps<T> extends Omit<TableProps<T>, 'className'> {
  pagination?: {
    pageSize: number;
    currentPage: number;
    totalCount?: number;
    onPageChange: (page: number) => void;
  };
  loading?: boolean;
  className?: string;
}

export function DataTable<T extends object>({
  columns,
  data,
  pagination,
  loading = false,
  ...tableProps
}: DataTableProps<T>) {
  // Calculate total pages
  const totalPages = pagination
    ? Math.ceil((pagination.totalCount || data.length) / pagination.pageSize)
    : 1;
  
  // Get visible data slice based on pagination
  const visibleData = pagination
    ? data.slice(0, pagination.pageSize) // Assume data is already sliced from API
    : data;
  
  return (
    <div className="space-y-4">
      {/* Table */}
      {loading ? (
        <div className={`${tableProps.variant === 'bordered' 
          ? 'border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' 
          : tableProps.variant === 'cutout'
          ? 'border-2 border-black transform rotate-[-0.5deg]'
          : 'border-2 border-black'}`}
        >
          <div className="p-8 text-center font-mono">
            <p>Loading data...</p>
          </div>
        </div>
      ) : (
        <Table
          columns={columns}
          data={visibleData}
          {...tableProps}
        />
      )}
      
      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex justify-between items-center font-mono">
          <div>
            {pagination.totalCount ? (
              <span className="text-sm">
                Showing {((pagination.currentPage - 1) * pagination.pageSize) + 1}-
                {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalCount)} of {pagination.totalCount}
              </span>
            ) : (
              <span className="text-sm">
                Page {pagination.currentPage} of {totalPages}
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              className={`
                px-3 py-1 border-2 border-black font-mono text-sm
                ${pagination.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
              `}
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            >
              Previous
            </button>
            
            <button
              className={`
                px-3 py-1 border-2 border-black font-mono text-sm
                ${pagination.currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
              `}
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Example implementation
interface ExampleData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date;
}

export const TableExamples: React.FC = () => {
  // Sample data
  const exampleData: ExampleData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: new Date(2023, 3, 15) },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', lastLogin: new Date(2023, 4, 2) },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive', lastLogin: new Date(2023, 2, 28) },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'pending', lastLogin: new Date(2023, 4, 10) },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Viewer', status: 'active', lastLogin: new Date(2023, 3, 25) },
  ];
  
  // Data table state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  
  // Example columns
  const columns: Column<ExampleData>[] = [
    {
      id: 'name',
      header: 'Name',
      accessor: row => row.name,
      sortable: true,
    },
    {
      id: 'email',
      header: 'Email',
      accessor: row => row.email,
    },
    {
      id: 'role',
      header: 'Role',
      accessor: row => row.role,
      align: 'center',
    },
    {
      id: 'status',
      header: 'Status',
      accessor: row => row.status,
      align: 'center',
      renderCell: (value, row) => {
        let color = '';
        switch (value) {
          case 'active':
            color = 'bg-green-100 text-green-800';
            break;
          case 'inactive':
            color = 'bg-red-100 text-red-800';
            break;
          case 'pending':
            color = 'bg-yellow-100 text-yellow-800';
            break;
        }
        
        return (
          <span className={`px-2 py-1 text-sm inline-block ${color}`}>
            {value}
          </span>
        );
      },
    },
    {
      id: 'lastLogin',
      header: 'Last Login',
      accessor: row => row.lastLogin,
      align: 'right',
      sortable: true,
      renderCell: (value, row) => {
        return value.toLocaleDateString();
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      accessor: row => row.id,
      align: 'center',
      renderCell: (value, row) => {
        return (
          <div className="flex justify-center space-x-2">
            <button 
              className="px-2 py-1 text-xs border border-black hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Edit clicked for ${row.name}`);
              }}
            >
              Edit
            </button>
            <button 
              className="px-2 py-1 text-xs border border-black hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Delete clicked for ${row.name}`);
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  
  // Handle row click
  const handleRowClick = (row: ExampleData) => {
    alert(`Row clicked: ${row.name}`);
  };
  
  return (
    <div className="p-6 max-w-6xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Table Components</h2>
      <p className="mb-8 font-sans">
        Table components with brutalist styling for displaying data in rows and columns.
      </p>
      
      <div className="space-y-16">
        {/* Basic Table */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Table</h3>
          <Table
            columns={columns}
            data={exampleData}
            keyField="id"
            variant="bordered"
          />
        </div>
        
        {/* Table Variants */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Table Variants</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Default</h4>
              <Table
                columns={columns.slice(0, 3)}
                data={exampleData.slice(0, 3)}
                keyField="id"
                variant="default"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Bordered</h4>
              <Table
                columns={columns.slice(0, 3)}
                data={exampleData.slice(0, 3)}
                keyField="id"
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Cutout</h4>
              <Table
                columns={columns.slice(0, 3)}
                data={exampleData.slice(0, 3)}
                keyField="id"
                variant="cutout"
              />
            </div>
          </div>
        </div>
        
        {/* Table Sizes */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Table Sizes</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Small</h4>
              <Table
                columns={columns.slice(0, 3)}
                data={exampleData.slice(0, 3)}
                keyField="id"
                variant="bordered"
                size="small"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Medium</h4>
              <Table
                columns={columns.slice(0, 3)}
                data={exampleData.slice(0, 3)}
                keyField="id"
                variant="bordered"
                size="medium"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Large</h4>
              <Table
                columns={columns.slice(0, 3)}
                data={exampleData.slice(0, 3)}
                keyField="id"
                variant="bordered"
                size="large"
              />
            </div>
          </div>
        </div>
        
        {/* Striped and Hoverable Table */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Striped and Hoverable Table</h3>
          <Table
            columns={columns}
            data={exampleData}
            keyField="id"
            variant="bordered"
            striped
            hoverable
          />
        </div>
        
        {/* Sortable Table */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Sortable Table</h3>
          <Table
            columns={columns}
            data={exampleData}
            keyField="id"
            variant="bordered"
            sortable
            defaultSortColumn="name"
            defaultSortDirection="asc"
          />
          <p className="text-sm text-gray-500 mt-2">
            Click on columns marked as sortable (Name and Last Login) to sort the table.
          </p>
        </div>
        
        {/* Interactive Table */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Interactive Table</h3>
          <Table
            columns={columns}
            data={exampleData}
            keyField="id"
            variant="bordered"
            hoverable
            onRowClick={handleRowClick}
          />
          <p className="text-sm text-gray-500 mt-2">
            Click on a row to trigger an action. Individual cell actions are also available.
          </p>
        </div>
        
        {/* Data Table with Pagination */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Data Table with Pagination</h3>
          <DataTable
            columns={columns}
            data={exampleData}
            keyField="id"
            variant="bordered"
            hoverable
            pagination={{
              pageSize,
              currentPage,
              totalCount: exampleData.length,
              onPageChange: setCurrentPage,
            }}
          />
        </div>
      </div>
    </div>
  );
}; 