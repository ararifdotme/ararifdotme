"use client";

import type { ComponentType } from "react";
import type { AppId } from "@/lib/store";
import type { DictKey } from "@/lib/i18n";
import About from "../apps/About";
import Projects from "../apps/Projects";
import Experience from "../apps/Experience";
import Skills from "../apps/Skills";
import Contact from "../apps/Contact";
import Terminal from "../apps/Terminal";

export const APPS: Record<AppId, { title: DictKey; Component: ComponentType }> = {
  about: { title: "about", Component: About },
  projects: { title: "projects", Component: Projects },
  experience: { title: "experience", Component: Experience },
  skills: { title: "skills", Component: Skills },
  contact: { title: "contact", Component: Contact },
  terminal: { title: "terminal", Component: Terminal },
};
