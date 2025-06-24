export interface IHomepageContent {
  _id: string;
  name: string;
  headline: string;
  aboutText: string;
  profileImageUrl?: string;
  featuredSkillIds: ISkill[];
  featuredProjectIds: IProject[];
  resumeUrl?: string;
}

export interface ISkill {
  _id: string;
  name: string;
  iconClass: string;
}

export interface IProject {
  _id: string;
  name: string;
  description: string;
  technologies: string[];
  repoLink?: string;
  liveLink?: string;
  imageUrl: string;
}

export interface IExperience {
  _id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  responsibilities: string[];
  technologies: string[];
}

export interface IArticle {
  _id: string;
  title: string;
  mediumUrl: string;
  imageUrl: string;
  excerpt: string;
}

export interface IContactMessage {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
}

export interface ISocialLink {
  _id: string;
  platform: string;
  url: string;
  iconClass: string;
}

export interface IUser {
  _id: string;
  username: string;
}
