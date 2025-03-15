import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { fetchSearchWeatherResult } from '@/Service/weather';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Loader2, Search } from 'lucide-react';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import useDebounce from '@/Hook/useDebounce';
import CurrentWeatherConfig from '@/Service/types/current-weather-config';
import { useNavigate } from 'react-router-dom';

function HeaderSearchBox() {
  const [input, setInput] = useState('');
  const [searchResult, setSearchResult] = useState<CurrentWeatherConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const debounceValue = useDebounce(input, 300);
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
    } catch (error) {
      console.log(error);
      setSearchResult(null);
      setLoading(false);
    }
  };

  const handleNavigate = (data: CurrentWeatherConfig | null) => {
    if (data && data.name.length > 0) {
      navigate(`/city/${data.name}`);
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
                  className="flex items-center my-1 py-3 px-2 rounded-md hover:bg-gray-500/50 transition-all cursor-pointer"
                >
                  <p>{formatName(searchResult?.name)}</p>
                  <p className="text-muted-foreground pl-1.5 text-sm">{searchResult?.sys.country}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default HeaderSearchBox;
