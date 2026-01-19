import { useState } from 'react';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
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

interface FilterDropdownProps {
  title: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}

const FilterDropdown = ({ title, options, selected, onToggle }: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`h-10 px-4 ${selected.length > 0 ? 'border-primary bg-primary/5' : ''}`}
        >
          {title}
          {selected.length > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
              {selected.length}
            </Badge>
          )}
          <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3" align="start">
        <div className="space-y-2">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer hover:bg-secondary/50 p-2 rounded-md transition-colors"
            >
              <Checkbox
                checked={selected.includes(option.value)}
                onCheckedChange={() => onToggle(option.value)}
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const MobileFilterContent = ({
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

  const FilterSection = ({
    title,
    options,
    selected,
    filterKey,
  }: {
    title: string;
    options: { value: string; label: string }[];
    selected: string[];
    filterKey: keyof Filters;
  }) => (
    <div className="space-y-3">
      <h4 className="font-medium text-sm">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Checkbox
              checked={selected.includes(option.value)}
              onCheckedChange={() => toggleFilter(filterKey, option.value)}
            />
            <span className="text-sm text-muted-foreground">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground w-full justify-start"
        >
          <X className="h-4 w-4 mr-2" />
          Clear all filters
        </Button>
      )}

      <FilterSection
        title="Category"
        options={categories}
        selected={filters.categories}
        filterKey="categories"
      />
      <FilterSection
        title="Style"
        options={styles}
        selected={filters.styles}
        filterKey="styles"
      />
      <FilterSection
        title="Length"
        options={lengths}
        selected={filters.lengths}
        filterKey="lengths"
      />
      <FilterSection
        title="Price Range"
        options={priceRanges}
        selected={filters.priceRange}
        filterKey="priceRange"
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

  const toggleFilter = (key: keyof Filters, value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: updated });
  };

  const activeFilterCount =
    filters.categories.length +
    filters.styles.length +
    filters.lengths.length +
    filters.priceRange.length;

  const getActiveFilters = () => {
    const active: { key: keyof Filters; value: string; label: string }[] = [];
    
    filters.categories.forEach((v) => {
      const opt = categories.find((c) => c.value === v);
      if (opt) active.push({ key: 'categories', value: v, label: opt.label });
    });
    filters.styles.forEach((v) => {
      const opt = styles.find((s) => s.value === v);
      if (opt) active.push({ key: 'styles', value: v, label: opt.label });
    });
    filters.lengths.forEach((v) => {
      const opt = lengths.find((l) => l.value === v);
      if (opt) active.push({ key: 'lengths', value: v, label: opt.label });
    });
    filters.priceRange.forEach((v) => {
      const opt = priceRanges.find((p) => p.value === v);
      if (opt) active.push({ key: 'priceRange', value: v, label: opt.label });
    });
    
    return active;
  };

  return (
    <div className="space-y-4">
      {/* Desktop Filters */}
      <div className="hidden md:flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <FilterDropdown
            title="Category"
            options={categories}
            selected={filters.categories}
            onToggle={(v) => toggleFilter('categories', v)}
          />
          <FilterDropdown
            title="Style"
            options={styles}
            selected={filters.styles}
            onToggle={(v) => toggleFilter('styles', v)}
          />
          <FilterDropdown
            title="Length"
            options={lengths}
            selected={filters.lengths}
            onToggle={(v) => toggleFilter('lengths', v)}
          />
          <FilterDropdown
            title="Price"
            options={priceRanges}
            selected={filters.priceRange}
            onToggle={(v) => toggleFilter('priceRange', v)}
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {totalResults} service{totalResults !== 1 ? 's' : ''}
          </span>
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
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden flex items-center justify-between gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="relative">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle className="font-serif">Filter Services</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <MobileFilterContent
                filters={filters}
                onFiltersChange={onFiltersChange}
                onClearAll={clearAllFilters}
              />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {totalResults}
          </span>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue placeholder="Sort" />
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
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {getActiveFilters().map((filter) => (
            <Badge
              key={`${filter.key}-${filter.value}`}
              variant="secondary"
              className="pl-2 pr-1 py-1 gap-1 cursor-pointer hover:bg-secondary/80"
              onClick={() => toggleFilter(filter.key, filter.value)}
            >
              {filter.label}
              <X className="h-3 w-3" />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground h-7 px-2"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};
