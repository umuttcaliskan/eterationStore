import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import FilterModal from '../../components/FilterModal';

describe('FilterModal', () => {
  const mockOnClose = jest.fn();
  const mockSetSelectedSort = jest.fn();
  const mockSetSelectedBrands = jest.fn();
  const mockSetSelectedModels = jest.fn();
  const mockSetBrandSearch = jest.fn();
  const mockSetModelSearch = jest.fn();

  const defaultProps = {
    visible: true,
    onClose: mockOnClose,
    sortOptions: [
      { label: 'Old to new', value: 'oldest' },
      { label: 'New to old', value: 'newest' },
      { label: 'Price high to low', value: 'price-desc' },
      { label: 'Price low to high', value: 'price-asc' }
    ],
    selectedSort: 'newest',
    setSelectedSort: mockSetSelectedSort,
    brands: ['Mercedes Benz', 'Ferrari', 'Fiat'],
    selectedBrands: [],
    setSelectedBrands: mockSetSelectedBrands,
    brandSearch: '',
    setBrandSearch: mockSetBrandSearch,
    models: ['Fortwo', 'Taurus', 'Golf'],
    selectedModels: [],
    setSelectedModels: mockSetSelectedModels,
    modelSearch: '',
    setModelSearch: mockSetModelSearch
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<FilterModal {...defaultProps} />);
    expect(getByText('Filter')).toBeTruthy();
  });

  it('calls onClose when close button is pressed', () => {
    const { getByTestId } = render(<FilterModal {...defaultProps} />);
    const closeButton = getByTestId('close-button');
    fireEvent.press(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('updates selected sort when sort option is pressed', () => {
    const { getByText } = render(<FilterModal {...defaultProps} />);
    const sortOption = getByText('Old to new');
    fireEvent.press(sortOption);
    expect(mockSetSelectedSort).toHaveBeenCalledWith('oldest');
  });

  it('updates selected brands when brand is pressed', () => {
    const { getByText } = render(<FilterModal {...defaultProps} />);
    const brandOption = getByText('Mercedes Benz');
    fireEvent.press(brandOption);
    expect(mockSetSelectedBrands).toHaveBeenCalledWith(['Mercedes Benz']);
  });

  it('updates selected models when model is pressed', () => {
    const { getByText } = render(<FilterModal {...defaultProps} />);
    const modelOption = getByText('Fortwo');
    fireEvent.press(modelOption);
    expect(mockSetSelectedModels).toHaveBeenCalledWith(['Fortwo']);
  });
}); 