export interface CommentAnnouncement {
  id?: number;
  content: string;
  attachFile?: string;
  teacherCode?: string;
  studentCode?: string;
  avatar: string;
  name: string;
  announcementId: number;
  dateCreate?: string;
}
