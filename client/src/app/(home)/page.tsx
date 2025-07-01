import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Edit, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const Index = () => {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Secton */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your Ideas into
            <span className="block text-muted-foreground">Visual Art</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Create stunning artwork from your photos or imagination using
            advanced AI technology. Simple, fast, and powerful.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href={"/generate/upload"}>
              <Button size="lg" className="gap-2 px-8 py-3 text-white">
                <Upload className="w-5 h-5" />
                Upload Image
              </Button>
            </Link>
            <Link href={"/generate"}>
              <Button size="lg" variant="outline" className="gap-2 px-8 py-3">
                <Edit className="w-5 h-5" />
                Generate from Text
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div
          className="grid md:grid-cols-2 gap-8 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <Card className="p-8 border-border bg-card">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mr-4">
                <Upload className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Upload & Transform</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Upload any image and transform it with AI. Choose from various
              artistic styles and watch your photo become a masterpiece.
            </p>
          </Card>

          <Card className="p-8 border-border bg-card">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mr-4">
                <Edit className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold">Text to Image</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Describe your vision and let AI bring it to life. From abstract
              concepts to detailed scenes, create anything you can imagine.
            </p>
          </Card>
        </div>

        {/* Call to Action */}
        <div
          className="text-center mt-16 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <Button size="lg" className="gap-2 px-12 py-4 text-lg">
            <Sparkles className="w-5 h-5" />
            Start Creating
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
