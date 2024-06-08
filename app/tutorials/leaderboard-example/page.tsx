"use client";

import { useEffect, useState } from "react";
import { Reorder, motion } from "framer-motion";

interface Article {
  title: string;
  upvotes: number;
  date: string;
}

const articles: Article[] = [
  { title: "Article A", upvotes: 50, date: "2022-01-01" },
  { title: "Article B", upvotes: 30, date: "2022-01-02" },
  { title: "Article C", upvotes: 40, date: "2022-01-03" },
  { title: "Article D", upvotes: 40, date: "2022-01-03" },
  { title: "Article E", upvotes: 50, date: "2022-01-03" },
  { title: "Article F", upvotes: 20, date: "2022-01-03" },
  { title: "Article G", upvotes: 90, date: "2022-01-03" },
  { title: "Article H", upvotes: 80, date: "2022-01-03" },
  { title: "Article I", upvotes: 70, date: "2022-01-03" },
  { title: "Article J", upvotes: 10, date: "2022-01-03" },
];

function Leaderboard() {
  const [finalArticles, setFinalArticles] = useState<Article[]>(articles);
  const [articleName, setArticleName] = useState<string>("");
  const [newUpvotes, setNewUpvotes] = useState<number>(0);

  const sortVoting = (articlesToSort: Article[]) => {
    return [...articlesToSort].sort((a, b) => b.upvotes - a.upvotes);
  };

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setFinalArticles((prevArticles) => {
  //         const updatedArticles = [...prevArticles];
  //         const randomIndex = Math.floor(Math.random() * updatedArticles.length);
  //         updatedArticles[randomIndex] = {
  //           ...updatedArticles[randomIndex],
  //           upvotes:
  //             updatedArticles[randomIndex].upvotes +
  //             Math.floor(Math.random() * 10) -
  //             5,
  //         };
  //         return sortVoting(updatedArticles);
  //       });
  //     }, 3000);

  //     return () => clearInterval(interval);
  //   }, []);
  const handleUpdateUpvotes = () => {
    setTimeout(() => {
      setFinalArticles((prevArticles) => {
        const updatedArticles = prevArticles.map((article) =>
          article.title === articleName
            ? { ...article, upvotes: newUpvotes }
            : article
        );
        return sortVoting(updatedArticles);
      });
    }, 1000);
  };

  useEffect(() => {
    const sorted = [...articles].sort((a, b) => a.upvotes - b.upvotes);
    setFinalArticles(sorted);
  }, []);

  function sortMostVoted() {
    const sorted = [...articles].sort((a, b) => b.upvotes - a.upvotes);
    setFinalArticles(sorted);
  }

  function sortMostRecent() {
    const sorted = [...articles].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setFinalArticles(sorted);
  }

  return (
    <>
      <main className="flex flex-col w-full h-screen items-center justify-center bg-slate-100">
        <div className="flex space-x-5 w-1/2 mb-5">
          <input
            type="text"
            placeholder="Article Name"
            value={articleName}
            onChange={(e) => setArticleName(e.target.value)}
            className="p-2 border"
          />
          <input
            type="text"
            placeholder="New Upvotes"
            onChange={(e) => setNewUpvotes(Number(e.target.value))}
            className="p-2 border"
          />
          <button
            className="bg-blue-500 text-white text-sm p-3 shadow-xl"
            onClick={handleUpdateUpvotes}
          >
            Upvotes
          </button>
          <button
            className="bg-green-500 text-white text-sm p-3 shadow-xl"
            onClick={sortMostVoted}
          >
            Most Voted
          </button>
          <button
            onClick={sortMostRecent}
            className="bg-green-500 text-white text-sm p-3 shadow-xl"
          >
            Most Recent
          </button>
        </div>
        <div
          className="flex w-1/2 border border-gray-300"
          style={{
            height: "50vh",
            overflowY: "auto",
          }}
        >
          <Reorder.Group
            axis="y"
            values={finalArticles}
            onReorder={setFinalArticles}
            as="table"
            className="table-auto w-full"
          >
            <thead>
              <tr>
                <th className="sticky top-0 border px-4 py-2 bg-blue-100">
                  Title
                </th>
                <th className="sticky top-0 border px-4 py-2 bg-blue-100">
                  Upvotes
                </th>
                <th className="sticky top-0 border px-4 py-2 bg-blue-100">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {finalArticles.map((article) => (
                <Reorder.Item key={article.title} value={article} as="tr">
                  <motion.td layout className="border text-center px-4 py-2">
                    {article.title}
                  </motion.td>
                  <motion.td layout className="border text-center px-4 py-2">
                    {article.upvotes}
                  </motion.td>
                  <motion.td layout className="border text-center px-4 py-2">
                    {article.date}
                  </motion.td>
                </Reorder.Item>
              ))}
            </tbody>
          </Reorder.Group>
        </div>
      </main>
    </>
  );
}

export default Leaderboard;
