Here’s a clean **README.md version** you can directly use in your project or documentation.

---

# Dynamic Questionnaire Engine

## Overview

This system is a **dynamic questionnaire engine** where questions are displayed based on user responses.

Instead of showing all questions at once:

* Only relevant questions are shown
* New questions appear based on selected answers
* Irrelevant questions are hidden automatically

This improves:

* User experience
* Data accuracy
* Form simplicity

---

## How It Works

* Each question has a list of possible answers
* Some answers trigger additional questions (child questions)
* These relationships are defined using parent-child mappings

### Flow Example

1. Question: *Where are you from?*

   * If answer = NY → show *How old are you?*
   * If answer = LA → show *Favorite food?*

2. Question: *Favorite food?*

   * If answer = Biryani → show *Favorite hangout spot?*

This creates a step-by-step dynamic flow.

---

## Core Concepts

* **Question**: A single unit displayed to the user
* **Response**: Possible answers for a question
* **Parent Question**: A question whose answer controls other questions
* **Child Question**: A question shown based on a parent’s answer
* **Section**: Logical grouping of questions

---

## Validation Rules

The following rules must always be enforced:

### 1. Same Section Rule

* Parent and child questions must belong to the same section

**Valid**

* Q1 (Entity Info) → Q2 (Entity Info)

**Invalid**

* Q1 (Entity Info) → Q10 (Review Info)

---

### 2. One Child → One Parent

* A child question can have only one parent

**Valid**

* Q1 → Q2

**Invalid**

* Q1 → Q2
* Q5 → Q2 (same child reused)

---

### 3. One Parent → Multiple Children Allowed

* A parent can trigger multiple child questions

Example:

* Q1 = Yes → Q2
* Q1 = Yes → Q3

---

### 4. No Circular Dependency

* Questions must not form loops

**Invalid**

* Q1 → Q2 → Q3 → Q1

---

### 5. Conditional Visibility

* A child question is shown only when its condition is met

Example:

* Q1 = NY → show Q2
* Q1 = DC → do not show Q2

---

### 6. Cleanup on Answer Change

* If a user changes an answer:

  * Remove dependent child questions
  * Clear their stored answers

---

## Data Model

### Question Table

| Field Name   | Description                     |
| ------------ | ------------------------------- |
| QuestionID   | Unique identifier               |
| QuestionText | Text of the question            |
| Section      | Section name                    |
| Active       | Whether question is active      |
| Conditional  | Whether question is conditional |
| ResponseType | List of possible answers        |

---

### Parent-Child Mapping Table

| Field Name | Description         |
| ---------- | ------------------- |
| ParentQID  | Parent question ID  |
| Answer     | Parent answer value |
| ChildQID   | Child question ID   |

---

## Examples

---

### Example 1: Simple Conditional Flow

#### Question Table

| QuestionID | Question Text       | Section     | Conditional | Responses     |
| ---------- | ------------------- | ----------- | ----------- | ------------- |
| Q001       | Where are you from? | Entity Info | No          | NY, DC, LA    |
| Q002       | How old are you?    | Entity Info | Yes         | 30, 40, 50    |
| Q003       | Favorite food?      | Entity Info | Yes         | Biryani, Dosa |

#### Parent-Child Table

| ParentQID | Answer | ChildQID |
| --------- | ------ | -------- |
| Q001      | NY     | Q002     |
| Q001      | LA     | Q003     |

---

### Example 2: One Parent with Multiple Children

#### Question Table

| QuestionID | Question Text           | Section    | Conditional | Responses      |
| ---------- | ----------------------- | ---------- | ----------- | -------------- |
| Q010       | Are you employed?       | Employment | No          | Yes, No        |
| Q011       | Employer Name           | Employment | Yes         | Text           |
| Q012       | Years of experience     | Employment | Yes         | 1-3, 3-5, 5+   |
| Q013       | Reason for unemployment | Employment | Yes         | Student, Other |

#### Parent-Child Table

| ParentQID | Answer | ChildQID |
| --------- | ------ | -------- |
| Q010      | Yes    | Q011     |
| Q010      | Yes    | Q012     |
| Q010      | No     | Q013     |

---

### Example 3: Multi-Level Dependency Flow

#### Question Table

| QuestionID | Question Text          | Section      | Conditional | Responses       |
| ---------- | ---------------------- | ------------ | ----------- | --------------- |
| Q100       | Do you own a vehicle?  | Vehicle Info | No          | Yes, No         |
| Q101       | Vehicle type           | Vehicle Info | Yes         | Car, Bike       |
| Q102       | Car brand              | Vehicle Info | Yes         | BMW, Audi       |
| Q103       | Bike type              | Vehicle Info | Yes         | Sports, Cruiser |
| Q104       | Do you have insurance? | Vehicle Info | Yes         | Yes, No         |

#### Parent-Child Table

| ParentQID | Answer | ChildQID |
| --------- | ------ | -------- |
| Q100      | Yes    | Q101     |
| Q101      | Car    | Q102     |
| Q101      | Bike   | Q103     |
| Q102      | BMW    | Q104     |

---

## Final Summary

* Questions are displayed dynamically based on user input
* Each question belongs to a section
* Parent-child relationships control visibility
* Each child has only one parent
* All dependencies stay within the same section
* The system forms a structured decision tree

---

If you want next step, I can extend this README with:

* Database schema (PostgreSQL)
* API contracts (Spring Boot)
* UI rendering logic (React + MUI)

Just tell me 👍
