"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Upload, Download, Share, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const UploadPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [styles, setStyles] = useState<string>("general");

  const handleGenerate = async () => {
    setIsGenerating(true);

    if (prompt.trim() === "") {
      toast.error("Please enter a prompt!");
      setIsGenerating(false);
      return;
    }

    const payload = { prompt, styles };

    try {
      const API_URL = "http://localhost:8080/api/v1/generate-from-text";

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        toast.error(res.text());
        setIsGenerating(false);

        throw new Error("someting went womg");
      }

      const blob = await res.blob();
      setGeneratedImage(URL.createObjectURL(blob));

      setIsGenerating(false);
      toast.success("Image generated successfully!");
    } catch (error) {
      setIsGenerating(false);
      toast.error("Someting Went Wrong!");
      console.log(error);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    if (generatedImage) {
      link.href = generatedImage;
      link.download = `CloudAi-${Date.now()}.png`;
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = () => {
    toast.info("Link copied to clipboard!");
  };

  return (
    <div className="bg-background text-foreground">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Link
              className="font-bold text-primary-foreground"
              href={"/generate/"}
            >
              Generate
            </Link>
            <Link className="font-light" href={"/generate/upload"}>
              Imagine
            </Link>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:h-[calc(100vh-200px)]">
          <div className="flex flex-col">
            <Card className="border-border flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload & Configure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 flex flex-col">
                <div className="aspect-video rounded-lg border-2 border-border flex items-center justify-center bg-muted/20 flex-1">
                  <Textarea
                    placeholder="A peaceful forest scene with sunlight filtering through trees..."
                    className="w-full h-full"
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleGenerate}
                    disabled={prompt.trim() === "" || isGenerating}
                  >
                    {isGenerating ? "Generating..." : "Generate Image"}
                  </Button>

                  <Select onValueChange={(value) => setStyles(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Styles</SelectLabel>
                        <SelectItem value="ghibli">Ghibli</SelectItem>
                        <SelectItem value="disney">Disney</SelectItem>
                        <SelectItem value="cartoon">Cartoon</SelectItem>
                        <SelectItem value="pixel_art">Pixel Art</SelectItem>
                        <SelectItem value="anime">Anime</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="flex flex-col">
            <Card className="border-border flex-1 flex flex-col">
              <CardHeader>
                <CardTitle>Preview & Results</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {!generatedImage && !isGenerating && (
                  <div className="flex-1 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/20">
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Transformed image will appear here
                      </p>
                    </div>
                  </div>
                )}

                {isGenerating && (
                  <div className="space-y-4 flex-1 flex flex-col">
                    <Skeleton className="flex-1 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                )}

                {generatedImage && !isGenerating && (
                  <div className="space-y-4 flex-1 flex flex-col">
                    <div className="flex-1 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={generatedImage}
                        alt="Generated"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleDownload} className="flex-1 gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleShare}
                        className="flex-1 gap-2"
                      >
                        <Share className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
