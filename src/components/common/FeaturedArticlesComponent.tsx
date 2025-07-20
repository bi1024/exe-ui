import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

// Define the structure for an article
interface Article {
  id: string;
  title: string;
  blurb: string;
}

// Dummy data for the articles
const articles: Article[] = [
  {
    id: "1",
    title: "Mastering Short-form Video: From Concept to Hook",
    blurb:
      "Learn the essentials of creating engaging short-form video content that captures attention and drives results. Discover techniques for ideation, scripting, and maximizing impact in minimal time.",
  },
  {
    id: "2",
    title: "10 Mistakes Junior Designers Keep Making (and How to Fix Them)",
    blurb:
      "Avoid common pitfalls in your design journey. This article highlights key errors made by junior designers and provides actionable advice to elevate your skills and professional practice.",
  },
  {
    id: "3",
    title: "How to Build a Personal Brand as a Content Writer",
    blurb:
      "Establish yourself as an authority in the content writing space. Explore strategies for developing a unique voice, showcasing your expertise, and attracting ideal clients through personal branding.",
  },
  {
    id: "4",
    title: "The Future of AI in Education: A Mentor's Perspective",
    blurb:
      "Explore how artificial intelligence is transforming learning environments and what it means for both students and educators. Insights from leading mentors on adapting to new technologies.",
  },
  {
    id: "5",
    title: "Unlocking Creativity: Techniques for Overcoming Writer's Block",
    blurb:
      "Struggling to find inspiration? This guide offers practical exercises and mindset shifts to help content creators break through creative barriers and maintain a consistent flow of ideas.",
  },
];

export default function FeaturedArticlesComponent() {
  // State to manage the current index of the displayed article in the carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to manage the search input value
  const [searchTerm, setSearchTerm] = useState("");

  // Function to navigate to the previous article
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  // Function to navigate to the next article
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === articles.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Filter articles based on search term
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.blurb.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine the article to display based on the current index
  // If no articles match the filter, or if the index is out of bounds for filtered results,
  // we'll display a message or handle it gracefully.
  const displayedArticle =
    filteredArticles.length > 0
      ? filteredArticles[currentIndex % filteredArticles.length]
      : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Featured Articles
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest insights from Skill Flow mentors and
            industry experts.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-12 max-w-xl mx-auto">
          <Input
            type="text"
            placeholder="Enter keyword to search articles"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>

        {/* Carousel Section */}
        <div className="relative w-full flex items-center justify-center">
          {/* Previous Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-0 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-300 ease-in-out hover:scale-110"
            aria-label="Previous article"
            disabled={filteredArticles.length <= 1} // Disable if only one or no articles
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </Button>

          {/* Article Card Display */}
          <div className="w-full max-w-2xl mx-auto">
            {filteredArticles.length > 0 ? (
              <Card className="w-full rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-[1.01] bg-white">
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {displayedArticle?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <CardDescription className="text-gray-700 text-base leading-relaxed">
                    {displayedArticle?.blurb}
                  </CardDescription>
                </CardContent>
              </Card>
            ) : (
              <p className="text-center text-gray-500 text-lg">
                No articles found matching your search.
              </p>
            )}
          </div>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-0 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-300 ease-in-out hover:scale-110"
            aria-label="Next article"
            disabled={filteredArticles.length <= 1} // Disable if only one or no articles
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </Button>
        </div>

        {/* Optional: Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {filteredArticles.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "bg-blue-600 w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to article ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
