# System Architecture

## Overview

StackSave is a full-stack AI spend optimization platform designed to analyze organizational AI tooling usage and generate actionable cost optimization insights.

The platform combines:
- dynamic frontend workflows
- backend persistence
- audit intelligence
- recommendation generation
- executive reporting

---

# High-Level Flow

```txt
User Input
   ↓
Audit Form
   ↓
Audit Engine
   ↓
Recommendation Generation
   ↓
Savings Calculation
   ↓
AI Summary Generation
   ↓
Supabase Persistence
   ↓
Dynamic Report Rendering
   ↓
PDF Export