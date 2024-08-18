import axios from "axios";


export const listSquadsByDomain = (domainId) => axios.get('http://localhost:8765/api/squads/domain' + '/' + domainId);
export const listAllSquads = () => axios.get('http://localhost:8765/api/squads');
export const addProject = (project) => axios.post('http://localhost:8765/api/projects',project);
export const DetailProject = (idProject) => axios.get('http://localhost:8765/api/projects' + '/' + idProject);
export const listProjects = (domainId) => axios.get('http://localhost:8765/api/projects/domain' + '/' + domainId);
export const deleteProject = (projectId) => axios.delete('http://localhost:8765/api/projects' + '/' + projectId);


export const addKPI = (kpi, projectId) => axios.post('http://localhost:8765/api/projects' + '/' + projectId + '/kpis', kpi);
export const addRemarkOrRisk = (remarkOrRisk,  projectId) => axios.post('http://localhost:8765/api/projects' + '/' + projectId + '/remarks', remarkOrRisk);
export const addMilestone = (milestone, projectId) => axios.post('http://localhost:8765/api/projects' + '/' + projectId + '/milestones', milestone);
export const addRealization = (realization, projectId) => axios.post('http://localhost:8765/api/projects' + '/' + projectId + '/upcomingRealizations', realization);


export const updatePhase = (updatedPhase, projectId) => axios.patch('http://localhost:8765/api/projects' + '/' + projectId + '/phase', updatedPhase);
export const updateSquad = (squad, projectId) => axios.patch('http://localhost:8765/api/projects' + '/' + projectId + '/squad', squad);

export const updateName = (name, projectId) => axios.patch('http://localhost:8765/api/projects' + '/' + projectId + '/name', name);
export const updateOwner = (owner, projectId) => axios.patch('http://localhost:8765/api/projects' + '/' + projectId + '/owner', owner);
export const updateStartDate = (startDate, projectId) => axios.patch('http://localhost:8765/api/projects' + '/' + projectId + '/start-date', startDate);
export const updateExpectedDate = (expectedDate, projectId) => axios.patch('http://localhost:8765/api/projects' + '/' + projectId + '/expected-date', expectedDate);
export const updateType = (type, projectId) => axios.patch('http://localhost:8765/api/projects' + '/' + projectId + '/type', type);
export const updateBudget = (budget, projectId) => axios.patch('http://localhost:8765/api/projects' + '/' + projectId + '/budget', budget);
export const updateDescription = (description, projectId) => axios.patch('http://localhost:8765/api/projects' + '/' + projectId + '/description', description);
export const updateAllocatedSprintCount = (allocatedSprint, projectId) => axios.patch('http://localhost:8765/api/projects' + '/' + projectId + '/allocated-sprint', allocatedSprint);
export const updateConsumedSprintCount = (consumedSprint, projectId) => axios.patch('http://localhost:8765/api/projects' + '/' + projectId + '/consumed-sprint', consumedSprint);
export const updateCompletionPercentage = (completionPercentage, projectId) => axios.patch('http://localhost:8765/api/projects' + '/' + projectId + '/completion-percentage', completionPercentage);
export const updateActualMepDate = (actualMepDate, projectId) => axios.patch('http://localhost:8765/api/projects' + '/' + projectId + '/actual-mep-date', actualMepDate);
export const updateLastPhaseDate = (lastPhaseDate, projectId) => axios.patch('http://localhost:8765/api/projects' + '/' + projectId + '/last-phase-date', lastPhaseDate);

export const updateMilestone = (supportId, index, milestone) => axios.patch('http://localhost:8765/api/projects' + '/' + supportId + '/milestone/' + index, milestone);
export const updateUpcomingRealization = (supportId, index, upcomingRealization) => axios.patch('http://localhost:8765/api/projects' + '/' + supportId + '/realization/' + index, upcomingRealization);


export const updateKpiName = (name, kpiId) => axios.patch('http://localhost:8765/api/projects/kpis' + '/' + kpiId + '/name', name);
export const updateKpiTarget = (target, kpiId) => axios.patch('http://localhost:8765/api/projects/kpis' + '/' + kpiId + '/target', target);
export const updateKpiCurrent = (current, kpiId) => axios.patch('http://localhost:8765/api/projects/kpis' + '/' + kpiId + '/current', current);

export const updateRemarkOrRiskName = (name, id) => axios.patch('http://localhost:8765/api/projects/remarks' + '/' + id + '/name', name);
export const updateRemarkOrRiskImportance = (importance, id) => axios.patch('http://localhost:8765/api/projects/remarks' + '/' + id + '/importance', importance);
