"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Song } from "@/app/type/SongType";
import { useSong } from "@/context/SongContext";

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");
  const [options, setOptions] = React.useState<Song[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { selectedSong, setSelectedSong } = useSong();
  const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null);

  const fetchOptions = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://saavn.dev/api/search/songs?query=${query}`
      );
      const result = await response.json();
      setOptions(result.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log({ value });
  console.log({
    selectedSong,
  });
  console.log({ options });

  React.useEffect(() => {
    if (value) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const id = setTimeout(() => {
        fetchOptions(value);
      }, 1000);
      setTimeoutId(id);
    } else {
      setOptions([]);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between p-2"
        >
          {selectedSong
            ? `${selectedSong.name} - ${
                selectedSong.artists.primary.length > 0
                  ? selectedSong.artists.primary[0].name
                  : "Unknown Artist"
              }`
            : "Search for a song..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <div className="relative">
            <CommandInput
              placeholder="Search for a song..."
              onValueChange={(e: string) => setValue(e)}
            />
          </div>
          <CommandList>
            {loading ? (
              <CommandEmpty>Loading...</CommandEmpty>
            ) : (
              <>
                <CommandEmpty>No songs found.</CommandEmpty>
                <CommandGroup>
                  {options?.map((option) => (
                    <CommandItem
                      key={option.id}
                      value={`${option.name} - ${
                        option.artists.primary.length > 0
                          ? option.artists.primary[0].name
                          : "Unknown Artist"
                      } - ${option.id}`}
                      onSelect={(currentValue) => {
                        const selected = options.find(
                          (song) =>
                            `${song.name} - ${song.artists.primary?.[0]?.name} - ${song.id}` ===
                            currentValue
                        );
                        setSelectedSong(selected || null);
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedSong?.id === option.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.name} -{" "}
                      {option.artists.primary.length > 0
                        ? option.artists.primary[0].name
                        : "Unknown Artist"}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
