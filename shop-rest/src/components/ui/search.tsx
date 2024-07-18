import SearchBox from '@components/ui/search-box';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useSearch } from '@contexts/search.context';
import * as ga from '.../lib/ga';


interface Props {
  label: string;
  variant?: 'minimal' | 'normal' | 'with-shadow' | 'flat';
  [key: string]: unknown;
}


const Search: React.FC<Props> = ({ label, variant, ...props }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { searchTerm, updateSearchTerm } = useSearch();
  const handleOnChange = (e: any) => {
    const { value } = e.target;
    updateSearchTerm(value);
  };

  const search = () => {
    ga.event({
      action: "search",
      params : {
        search_term: searchTerm
      }
    })
  }

  const onSearch = (e: any) => {
    search()
    e.preventDefault();
    if (!searchTerm) return;
    const { pathname, query } = router;
    router.push(
      {
        pathname,
        query: { ...query, text: searchTerm },
      },
      undefined,
      {
        scroll: false,
      }
    );
  };

  function clearSearch() {
    updateSearchTerm('');
    const { pathname, query } = router;
    const { text, ...rest } = query;
    if (text) {
      router.push(
        {
          pathname,
          query: { ...rest },
        },
        undefined,
        {
          scroll: false,
        }
      );
    }
  }

  return (

    <SearchBox
      label={label}
      onSubmit={onSearch}
      onClearSearch={clearSearch}
      onChange={handleOnChange}
      value={searchTerm}
      name="search"
      placeholder={t('common:text-search-placeholder')}
      variant={variant}
      {...props}
    />
    
  );
};

export default Search;