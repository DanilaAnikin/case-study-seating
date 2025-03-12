# 🎟 NFCtron Frontend Task

This project is a frontend application built as part of the NFCtron technical challenge. It is designed to display event seating, allow users to select and purchase tickets, and provide a smooth checkout experience.
## 🚀 Technologies Used

    React – Core framework for building the UI.
    Next.js – Server-side rendering and optimized routing.
    TypeScript – Strongly typed JavaScript for better maintainability.
    Tailwind CSS – Utility-first styling for rapid UI development.
    Context API – Used for global state management (TranslationProvider).
    LocalStorage – Persisting cart data across sessions.

## 🔧 Key Features

    Seating Map with Empty Seats – Displays all seats, even if some are missing in the dataset.
    VIP Seat Highlighting – Seats marked as VIP have a distinct gold border.
    Translation Support – Multi-language support (Czech & English) using Context API.
    LocalStorage Integration – Cart data persists across page reloads.
    Dynamic Pricing – Different ticket types with corresponding prices.

## 🛠 Challenges & Solutions
1. Handling Missing Seat Numbers

    Problem: Some seat numbers were missing, creating an inconsistent layout.
    Solution: Implemented logic to generate full rows, ensuring gaps are visible.

2. Translation in External Pages

    Problem: The /checkout page was an external link and not inside the TranslationProvider.
    Solution: Potential solutions include using URL parameters for language selection or refactoring the app structure to wrap /checkout inside the provider.

3. VIP Seat Styling

    Problem: VIP seats were not visually distinct.
    Solution: Applied a gold border for VIP seats.

## 📌 Future Improvements

    Better State Management – Consider using Redux or Zustand instead of Context API for scalability.
    Accessibility Enhancements – Improve keyboard navigation and screen reader support.
    More features - Adding other bonuses as language system or calendar or google login
