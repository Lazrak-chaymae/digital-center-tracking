import React from 'react'
import { Card, Button } from 'antd';
import { MenuOutlined, CalendarOutlined } from '@ant-design/icons';

const ProjectCard = ({ id, title, status, phase, squad, date }) => {
    return (
        <Card title={title} bordered={false}  className="custom-card" key={id}>
            <div className="info-row">
                <MenuOutlined className="icon" /> <span className="label">Statut</span>
                <Button className="square-button">{status}</Button>
            </div>
            <div className="info-row">
                <MenuOutlined className="icon" /> <span className="label">Phase</span>
                <Button className="square-button">{phase ? phase : "N/A"}</Button>
            </div>
            <div className="info-row">
                <MenuOutlined className="icon" /> <span className="label">Squad</span>
                <Button className="square-button">{squad ? squad.name : "N/A"}</Button>
            </div>
            <div className="info-row">
                <CalendarOutlined className="icon" /> <span className="label">Date</span>
                <Button className="square-button">{date ? date : "N/A"}</Button>
            </div>
            <div className="details-link">
                <Button type="link" href={`/project/${id}`}>Details</Button>
            </div>
        </Card>
    )
}

export default ProjectCard