"use client";

import { useState } from "react";
import lessons from "@/data/learning-khmer-lessons.json";

const groups = [
  { id: 2, title: "Spelling Khmer", description: "Practice reading words and final consonants." },
  { id: 3, title: "Consonant clusters", description: "Read passages with subscript consonants." },
  { id: 4, title: "Reading", description: "Read and listen, then check your understanding." },
  { id: 5, title: "Conversation", description: "Listen to conversations one line at a time." },
];
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const audioUrl = (file) => `${base}/audio/learning-khmer/lessons/${file}`;

function Quiz({ questions }) {
  const [answers, setAnswers] = useState({});
  if (!questions.length) return null;
  return (
    <section className="space-y-4" aria-label="Reading questions">
      <h3 className="text-xl font-extrabold">Check your understanding</h3>
      {questions.map((question) => (
        <fieldset key={question.id} className="rounded-2xl border-2 border-muted p-4 space-y-2">
          <legend className="khmer-text font-bold px-1">{question.question}</legend>
          {question.answers.map((answer, index) => (
            <label key={index} className="flex gap-2 items-start khmer-text cursor-pointer">
              <input type="radio" name={`question-${question.id}`} checked={answers[question.id] === index}
                onChange={() => setAnswers((previous) => ({ ...previous, [question.id]: index }))} className="mt-1.5" />
              <span>{answer.text}</span>
            </label>
          ))}
          {answers[question.id] !== undefined && (
            <p role="status" className="text-sm font-bold">
              {question.answers[answers[question.id]].correct ? "✅ Correct!" : "🔄 Try again"}
            </p>
          )}
        </fieldset>
      ))}
    </section>
  );
}

export function LearningKhmerLessons({ onBack }) {
  const [selected, setSelected] = useState(null);
  if (selected) return (
    <div className="max-w-3xl mx-auto space-y-5">
      <button onClick={() => setSelected(null)} className="font-bold text-primary hover:underline">← All lessons</button>
      <article className="bg-card rounded-3xl border-4 border-primary/20 p-5 sm:p-8 space-y-6">
        <h2 className="khmer-text text-2xl sm:text-3xl font-extrabold">{selected.title}</h2>
        <p className="khmer-text text-xl leading-loose whitespace-pre-line">{selected.article}</p>
        {selected.audio && <audio controls preload="none" src={audioUrl(selected.audio)} className="max-w-full" aria-label="Listen to the reading" />}
        {selected.vocabulary && <div><h3 className="font-bold mb-2">Vocabulary</h3><p className="khmer-text leading-loose">{selected.vocabulary}</p></div>}
        {selected.lines.length > 0 && <section className="space-y-4"><h3 className="text-xl font-extrabold">Listen to the conversation</h3>
          {selected.lines.map((line, index) => <div key={index} className="rounded-2xl bg-primary/5 p-4 space-y-3">
            {line.image && <img src={`${base}/images/learning-khmer/${line.image}`} alt="" className="rounded-xl max-h-48 object-contain" />}
            <p className="khmer-text text-lg leading-loose">{line.text}</p>
            {line.audio && <audio controls preload="none" src={audioUrl(line.audio)} className="max-w-full" aria-label={`Listen to conversation line ${index + 1}`} />}
          </div>)}
        </section>}
        <Quiz key={selected.id} questions={selected.questions} />
      </article>
    </div>
  );
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <button onClick={onBack} className="font-bold text-primary hover:underline">← Flashcard decks</button>
      <div className="text-center space-y-2"><h2 className="text-3xl font-extrabold">📖 Learning Khmer lessons</h2><p className="text-muted-foreground">Read, listen, and practice with lessons from ReanKhmer.</p></div>
      {groups.map((group) => <section key={group.id} className="space-y-3">
        <div><h3 className="text-xl font-extrabold">{group.title}</h3><p className="text-sm text-muted-foreground">{group.description}</p></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {lessons.filter((lesson) => lesson.chapter === group.id).sort((a, b) => a.number - b.number).map((lesson) =>
            <button key={lesson.id} onClick={() => setSelected(lesson)} className="text-left rounded-2xl border-2 border-primary/20 bg-card p-4 hover:border-primary hover:shadow-md transition-all">
              <span className="block text-xs font-bold text-muted-foreground mb-1">Lesson {lesson.number}</span><span className="khmer-text font-bold">{lesson.title}</span>
            </button>)}
        </div>
      </section>)}
    </div>
  );
}
