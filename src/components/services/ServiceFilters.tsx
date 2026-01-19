import { useState } from 'react';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { categories, styles, lengths, priceRanges, sortOptions } from '@/data/services';

interface Filters {
  categories: string[];
  styles: string[];
  lengths: string[];
  priceRange: string[];
}

interface ServiceFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalResults: number;
}

const FilterSection = ({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b border-border pb-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
        <span className="font-medium text-sm">{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Checkbox
              checked={selected.includes(option.value)}
              onCheckedChange={() => onToggle(option.value)}
            />
            <span className="text-sm text-muted-foreground">{option.label}</span>
          </label>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

const FilterContent = ({
  filters,
  onFiltersChange,
  onClearAll,
}: {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClearAll: () => void;
}) => {
  const toggleFilter = (key: keyof Filters, value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: updated });
  };

  const hasFilters =
    filters.categories.length > 0 ||
    filters.styles.length > 0 ||
    filters.lengths.length > 0 ||
    filters.priceRange.length > 0;

  return (
    <div className="space-y-4">
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear all filters
        </Button>
      )}

      <FilterSection
        title="Category"
        options={categories}
        selected={filters.categories}
        onToggle={(v) => toggleFilter('categories', v)}
      />
      
      <FilterSection
        title="Style"
        options={styles}
        selected={filters.styles}
        onToggle={(v) => toggleFilter('styles', v)}
      />
      
      <FilterSection
        title="Length"
        options={lengths}
        selected={filters.lengths}
        onToggle={(v) => toggleFilter('lengths', v)}
      />
      
      <FilterSection
        title="Price Range"
        options={priceRanges}
        selected={filters.priceRange}
        onToggle={(v) => toggleFilter('priceRange', v)}
      />
    </div>
  );
};

export const ServiceFilters = ({
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  totalResults,
}: ServiceFiltersProps) => {
  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      styles: [],
      lengths: [],
      priceRange: [],
    });
  };

  const activeFilterCount =
    filters.categories.length +
    filters.styles.length +
    filters.lengths.length +
    filters.priceRange.length;

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {totalResults} service{totalResults !== 1 ? 's' : ''}
        </p>
        
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <SlidersHorizontal className="h-4 w-4 mr-1" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="font-serif">Filter Services</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent
                  filters={filters}
                  onFiltersChange={onFiltersChange}
                  onClearAll={clearAllFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-semibold text-lg">Filters</h3>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            {totalResults} service{totalResults !== 1 ? 's' : ''}
          </p>
          
          <FilterContent
            filters={filters}
            onFiltersChange={onFiltersChange}
            onClearAll={clearAllFilters}
          />
        </div>
      </aside>
    </>
  );
};
