export interface ProgressPhase {
  id: number;
  name: string;
  dateStart: string;
  dateEnd: string;
  status: string;
  stage: number;
  enable: boolean;
  projectId: number;
  backgroundColor: string;
  colorStatus: string;
}
