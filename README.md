# 🚀 Dev Discuss

**Dev Discuss** is a platform that allows the developer community to interact by posting questions, answering, commenting, and voting. The reputation system increases user credibility based on votes, encouraging quality contributions.

---

## 🔥 Features

- 📝 **Ask & Answer Questions**  
  Users can post technical questions and receive answers from other developers.

- 💬 **Comments & Discussions**  
  Each question and answer can be commented on for clarifications and discussions.

- 👍 **Voting System & Reputation**  
  Users gain or lose reputation based on community votes on their questions and answers.

- 👤 **User Profiles**  
  View profile summaries including:

  - Total questions asked
  - Answers given
  - Reputation score
  - Vote filtering (Upvotes, Downvotes, All)

- 🔄 **Full CRUD Functionality**  
  Create, read, update, and delete questions and answers with permissions.

---

## ⚙️ Tech Stack

### Frontend

- [Next.js 15](https://nextjs.org/) (App Router)
- [Zustand](https://github.com/pmndrs/zustand) for auth and global state
- [Shadcn/UI](https://ui.shadcn.com/) and [MagicUI](https://magicui.design/) for components
- [Framer Motion](https://www.framer.com/motion/) for animations
- [@tabler/icons-react](https://www.npmjs.com/package/@tabler/icons-react) for icons
- [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor) for markdown input
- [slugify](https://www.npmjs.com/package/slugify) for URL slugs
- [Immer](https://immerjs.github.io/immer/) for immutable state updates with Zustand

### Backend / SaaS

- [Appwrite](https://appwrite.io/) as a BaaS platform

  - Authentication
  - Database
  - Storage

- [Appwrite Node.js SDK](https://github.com/appwrite/sdk-for-node) used for managing database structure and custom logic via code.
- Some custom API routes are built to handle specific business logic and integrate smoothly with Appwrite services.

---

## 🧠 Core Modules

- **Homepage:** Lists latest or top-voted questions
- **Auth Pages:** Sign up and login functionality
- **Questions Module:**
  - List all questions
  - Individual question page: `/questions/[id]/[slug]`
  - Create new question
  - Edit existing question
  - Vote on questions and answers
  - Post and view answers
- **User Profile:**
  - View summary
  - All activity (questions/answers/votes)
  - Vote filtering by type (upvotes/downvotes/all)

---

## 🛠️ Environment Setup

A sample `.env-sample` file is provided in the root directory.  
Fill it with your Appwrite project credentials:

Then run the development server:

```bash
npm install
npm run dev

```

📌 Summary

DevDiscuss is a fully functional, reputation-driven Q&A platform where developers can share knowledge by asking questions, posting answers, voting, and interacting through comments. It supports dynamic user profiles, content filtering, and interactive features with modern UI/UX. Powered by Appwrite and a robust Next.js 15 frontend, the project showcases real-world architecture, API usage, and clean component-based design.
