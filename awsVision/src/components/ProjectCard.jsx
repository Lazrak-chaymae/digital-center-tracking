import React from 'react'
import { Card, Button } from 'antd';
import { MenuOutlined, CalendarOutlined } from '@ant-design/icons';

const ProjectCard = ({ title, status, phase, squad, date, detailsLink }) => {
    return (
        <Card title={title} bordered={false}  className="custom-card">
            <div className="info-row">
                <MenuOutlined className="icon" /> <span className="label">Statut</span>
                <Button className="square-button">{status}</Button>
            </div>
            <div className="info-row">
                <MenuOutlined className="icon" /> <span className="label">Phase</span>
                <Button className="square-button">{phase}</Button>
            </div>
            <div className="info-row">
                <MenuOutlined className="icon" /> <span className="label">Squad</span>
                <Button className="square-button">{squad}</Button>
            </div>
            <div className="info-row">
                <CalendarOutlined className="icon" /> <span className="label">Date</span>
                <Button className="square-button">{date}</Button>
            </div>
            <div className="details-link">
                <Button type="link" href={detailsLink}>Details</Button>
            </div>
        </Card>
    )
}

export default ProjectCard