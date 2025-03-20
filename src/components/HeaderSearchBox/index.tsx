import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Loader2, Search, XCircleIcon } from 'lucide-react';

import { SetStateAction, useEffect, useRef, useState } from 'react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useNavigate } from 'react-router-dom';

import CurrentWeatherConfig from '@/Service/types/current-weather-config';
import { fetchSearchWeatherResult } from '@/Service/weather';

import useSearchHistory from '@/Hook/useSearchHistory';
import useDebounce from '@/Hook/useDebounce';

import './header-search-box.css';

function HeaderSearchBox() {
  const [input, setInput] = useState('');
  const [searchResult, setSearchResult] = useState<CurrentWeatherConfig | null>(null);
  const { searchHistory, addToHistory, deleteEachResult, clearHistory } = useSearchHistory('search_history');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const debounceValue = useDebounce(input, 1000);
  const navigate = useNavigate();

  const handleInputRef = (e: { currentTarget: { value: SetStateAction<string> } }) => {
    setInput(e.currentTarget.value);
  };
  

  useEffect(() => {
    if (debounceValue) {
      handleFetchSearchResult(debounceValue);
    } else {
      setSearchResult(null);
      setLoading(false);
    }
  }, [debounceValue]);

  const handleFetchSearchResult = async (result: SetStateAction<string>) => {
    try {
      setLoading(true);
      const res = await fetchSearchWeatherResult(result);
      setLoading(false);
      setSearchResult(res);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSearchResult(null);
      setLoading(false);
    }
  };

  const handleNavigate = async (data: CurrentWeatherConfig | null) => {
    if (data && data.name.length > 0) {
      await navigate(`/city/${data.name}`);
      setOpen(false);
      addToHistory(data);
    }
  };

  const handleNavigateHistory = async (data: CurrentWeatherConfig | null) => {
    if (data && data.name.length > 0) {
      await navigate(`/city/${data.name}`);
      setOpen(false);
    }
  };

  const formatName = (name: string | undefined) => {
    if (name) {
      return `${name},`;
    }
    return '';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className="cursor-pointer"
          variant="outline"
        >
          <Search />
          <p className="text-muted-foreground">Search cities...</p>
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="" className="sm:max-w-[425px]">
        <DialogTitle></DialogTitle>
        <div className="py-4">
          <div className="relative">
            <Search className="absolute right-2 w-4 h-4 top-1/4" />
            <Input value={input} onChange={handleInputRef} ref={inputRef} placeholder="Search cities..." />
          </div>
          <div className="border-t my-3">
            <span className="text-muted-foreground font-bold text-sm">Suggestions</span>
          </div>
          <div>
            {loading ? (
              <div className="flex text-center items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <>
                <div
                  onClick={() => {
                    handleNavigate(searchResult);
                  }}
                  className={`flex items-center my-1 py-3 px-2 rounded-md ${
                    debounceValue ? 'hover:bg-gray-500/50' : ''
                  } transition-all ${debounceValue ? 'cursor-pointer' : ''}`}
                >
                  <p>{formatName(searchResult?.name)}</p>
                  <p className="text-muted-foreground pl-1.5 text-sm">{searchResult?.sys.country}</p>
                </div>
              </>
            )}
          </div>
          <div className="border-t my-3 flex justify-between">
            <span className="text-muted-foreground font-bold text-sm">History</span>
            <div onClick={clearHistory} className="flex items-center hover:underline cursor-pointer">
              <span className="text-sm mr-1">Clear History</span>
              <XCircleIcon className="w-4 h-4 translate-y-0.5" />
            </div>
          </div>
          <div className="max-h-[200px] overflow-auto history-list">
            {searchHistory.map((item, index) => (
              <div
                key={`history-${index}`}
                onClick={() => {
                  handleNavigateHistory(item);
                }}
                className="group flex items-center justify-between my-1 py-3 px-2 rounded-md hover:bg-gray-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-center">
                  <p>{formatName(item?.name)}</p>
                  <p className="text-muted-foreground pl-1.5 text-sm">{item?.sys.country}</p>
                </div>
                <div>
                  <XCircleIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteEachResult(`history-${index}`);
                    }}
                    className="w-5 h-5 hidden group-hover:block transition-all delay-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default HeaderSearchBox;
