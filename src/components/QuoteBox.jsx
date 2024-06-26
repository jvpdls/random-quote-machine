import axios from "axios";
import { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight, FaSquareXTwitter } from "react-icons/fa6";

export default function QuoteBox() {
  const [quote, setQuote] = useState("Loading quote...");
  const [author, setAuthor] = useState("Loading author...");
  const [randomColor, setRandomColor] = useState("");
  const [escapedQuote, setEscapedQuote] = useState("#");

  // Generates a random color from a list of tailwind colors
  function generateRandomColor() {
    const colors = [
      "red-600",
      "yellow-600",
      "green-600",
      "blue-600",
      "orange-600",
      "amber-600",
      "lime-600",
      "emerald-600",
      "sky-600",
      "indigo-600",
      "purple-600",
      "fuchsia-600",
      "rose-600",
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setRandomColor(randomColor);
  }

  // Fetches a random quote from the quotable API
  async function fetchQuote() {
    return axios
      .get("https://api.quotable.io/random")
      .then((response) => {
        setQuote(response.data.content);
        setAuthor(response.data.author);
        setEscapedQuote(
          encodeURIComponent(
            `${response.data.content} - ${response.data.author}`
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Sets the random color and fetches a new quote
  function fetchQuoteAndColor() {
    fetchQuote()
      .then(() => {
        generateRandomColor();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Fetches a random quote and color on component mount
  useEffect(() => {
    generateRandomColor();
    fetchQuote();
  }, []);

  return (
    <div
      id="container"
      className={`bg-${randomColor} h-screen flex justify-center items-center font-raleway`}
    >
      <div
        id="quote-box"
        className="bg-white w-5/6 md:w-full max-w-lg h-max p-6 rounded-md"
      >
        <p
          id="text"
          className={`text-${randomColor} text-center text-2xl font-medium`}
        >
          <FaQuoteLeft />
          {quote}
          <FaQuoteRight className="ml-auto" />
        </p>
        <p id="author" className={`text-${randomColor} text-right mt-5`}>
          - {author}
        </p>
        <div className="quote-options mt-5 flex justify-between items-center">
          <a
            href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${escapedQuote}`}
            target="_blank"
            id="tweet-quote"
            className={`text-${randomColor}`}
            aria-label="Tweet this quote!"
          >
            <FaSquareXTwitter size={35} />
          </a>
          <button
            id="new-quote"
            onClick={() => fetchQuoteAndColor()}
            className={`bg-${randomColor} text-white p-2 rounded-md`}
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}
