import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Photo } from "@shared/schema";
import doYouSeeMe from "@assets/do u_1751898655452.jpg";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: photos = [], isLoading } = useQuery<Photo[]>({
    queryKey: ["/api/photos"],
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('photo', file);
      
      const response = await apiRequest('POST', '/api/photos', formData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/photos"] });
      toast({
        title: "Photo uploaded successfully",
        description: "Your photo has been added to the gallery.",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    onError: (error) => {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your photo. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }

      uploadMutation.mutate(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Floating Background Element */}
      <div className="floating-bg">
        <img 
          src={doYouSeeMe} 
          alt="Do You See Me handwritten text" 
          className="w-[800px] sm:w-[900px] md:w-[1000px] lg:w-[1200px] h-auto opacity-100" 
        />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl relative z-10">
        <main className="text-center space-y-12">
          {/* Header Text */}
          <section className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-serif leading-relaxed text-black">
              A TEĎ MĚ VIDÍŠ?
            </h1>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl leading-relaxed font-serif text-black">
                is a photography collecting project for people that picks up the small things around them.<br />
                I´ve planted stickers with QR codes in various places, to find out the most attractive and eye-catching ones.<br />
                Feel free to share a photo of the sticker that you´ve found
              </p>
            </div>
          </section>

          {/* Upload Section */}
          <section className="py-8">
            <div className="text-center">
              <button
                onClick={handleUploadClick}
                disabled={uploadMutation.isPending}
                className="text-lg font-serif text-black bg-white hover:underline transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-none bg-transparent"
              >
                {uploadMutation.isPending ? "Uploading..." : "Add Photo"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </section>

          {/* Photo Gallery */}
          <section className="py-12">
            {isLoading ? (
              <div className="grid grid-cols-3 gap-0">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="aspect-square bg-gray-100 animate-pulse"></div>
                ))}
              </div>
            ) : photos.length === 0 ? (
              <div className="py-16">
                <p className="text-black font-serif">No photos uploaded yet. Be the first to share a photo!</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-0">
                {photos.map((photo) => (
                  <div key={photo.id} className="aspect-square">
                    <img
                      src={`/uploads/${photo.filename}`}
                      alt={`Uploaded photo: ${photo.originalName}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Footer Credits */}
          <footer className="pt-12 pb-8">
            <div className="max-w-2xl mx-auto">
              <p className="text-sm leading-relaxed font-serif text-center text-black">
                site made with replit.com, FONT CREDIT to plain-form.com, typeface- ready active light. Non comercial use<br />
                contact me for more info- touskovazuza@gmail.com
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
