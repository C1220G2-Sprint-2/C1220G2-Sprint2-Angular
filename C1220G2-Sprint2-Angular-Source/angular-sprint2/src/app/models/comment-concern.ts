export interface CommentConcern {
  id?: number;
  content: string;
  attachFile?: string;
  teacherCode?: string;
  studentCode?: string;
  avatar: string;
  name: string;
  concernId: number;
  projectId: number;
  dateCreate?: string;
}
