"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Upload, Download, Share, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
const UploadPage = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [prompt, setPrompt] = useState<string>("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setGeneratedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);

    if (!uploadedImage) {
      toast.error("Please upload an image first!");
      setIsGenerating(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", uploadedImage!);
    formData.append("prompt", prompt);

    setProgress(60);

    try {
      setProgress(30);

      const response = await fetch(uploadedImage);
      const blob = await response.blob();
      const file = new File([blob], "uploaded.png", { type: blob.type });

      const formData = new FormData();
      formData.append("image", file);
      formData.append("prompt", prompt);

      setProgress(20);

      const res = await fetch("http://localhost:8080/api/v1/generate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error(res.statusText || "Something went wrong!");
        setIsGenerating(false);
        return;
      }

      const imageBlob = await res.blob();
      setGeneratedImage(URL.createObjectURL(imageBlob));

      console.log(generatedImage);
      toast.success("Image generated successfully!");

      setProgress(100);
      setIsGenerating(false);
    } catch (error) {
      toast.error("Something went wrong!");
      setIsGenerating(false);
      console.error(error);
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
    toast("Link copied to clipboard!");
  };

  return (
    <div className="bg-background text-foreground">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href={"/"}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <Link className="font-light" href={"/generate/"}>
              Generate
            </Link>
            <Link
              className="font-bold text-primary-foreground"
              href={"/generate/upload"}
            >
              Imagine
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:h-[calc(100vh-200px)]">
          {/* Upload Section */}
          <div className="flex flex-col">
            <Card className="border-border flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload & Configure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 flex flex-col">
                <div>
                  <Label htmlFor="image-upload">Choose Image</Label>
                  <div className="mt-2">
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="textarea">Enter a prompt</Label>
                  <div className="mt-2">
                    <Textarea
                      id="textarea"
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                </div>

                {!uploadedImage && (
                  <div className="aspect-video rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/20 flex-1">
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Upload an image to get started
                      </p>
                    </div>
                  </div>
                )}

                {uploadedImage && (
                  <div className="space-y-4 flex-1 flex flex-col">
                    <div className="flex-1 rounded-lg overflow-hidden bg-muted relative">
                      <Image
                        fill
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {isGenerating && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Transforming image...</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="w-full" />
                      </div>
                    )}

                    <Button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full gap-2"
                    >
                      {isGenerating ? "Transforming..." : "Transform Image"}
                    </Button>
                  </div>
                )}
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
