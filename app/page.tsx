"use client";
import { ComboboxDemo } from "@/components/ui/combobox";
import { generateText } from "./actions";
import ResultRoast from "@/components/ResultRoast";
import SubmitButton from "@/components/SubmitButtonRoast";
import { useSong } from "@/context/SongContext";
import { useState } from "react";
import { result } from "./type/SongType";
import Footer from "@/components/Footer";

export default function Home() {
  const { selectedSong } = useSong();
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<result>({
    name: "",
    artist: "",
    text: "",
    image: "",
  });

  const submitHandler = async () => {
    try {
      setLoading(true);

      if (!selectedSong) {
        setResult({
          ...result,
          text: "Pilih dlu lagunya bro",
        });
      } else {
        const resultRoast = await generateText(selectedSong);
        setResult(resultRoast);
      }
    } catch (error) {
      setResult({
        ...result,
        text: "Waduh restricted roastingan nya 😅 coba pencet roast ulang",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full antialiased flex flex-col items-center justify-center">
      <h1 className="text-xl md:text-3xl font-bold flex flex-col mt-12">
        Roast your favourite song 🔥
      </h1>
      <div className="flex flex-col mt-12">
        <ComboboxDemo />
        <SubmitButton loading={loading} action={submitHandler} />
      </div>

      {loading ? (
        <div className="mt-12 text-md font-bold">Loading...</div>
      ) : (
        <>
          {result.text !== "" ? (
            <ResultRoast result={result} image={result.image} />
          ) : (
            <div className="mt-12 h-72">
              <p>No Selected Song</p>
            </div>
          )}
        </>
      )}

      <Footer />
    </main>
  );
}
