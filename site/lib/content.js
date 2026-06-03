import chapters from "../public/data/chapters.json";
import radar from "../public/data/radar.json";
import models from "../public/data/models.json";

export function getChapters() {
  return chapters;
}

export function getChapter(slug) {
  return chapters.find((chapter) => chapter.slug === slug);
}

export function getRadarItems() {
  return radar;
}

export function getModelItems() {
  return models;
}

export function getNextPrev(slug) {
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  return {
    previous: index > 0 ? chapters[index - 1] : null,
    next: index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : null
  };
}
