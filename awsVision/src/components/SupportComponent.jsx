import React, { useEffect, useState } from 'react'
import { listSupport } from '../services/Support';

const SupportComponent = () => {

    const [supports, setSupports] = useState([]);
    const getSupport = () => {
        listSupport().then(
            (response) => {
                setSupports(response.data);
            }
        )
            .catch(
                error => {
                    console.error(error);
                }
            )
    }
    useEffect(() => {
        getSupport();
    }, [])
    return (
        <div className='container' style={{ paddingTop: '12px' }}>
            <h3 className='text-center'>Activité Support N3</h3>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Nombre des tickets support sur le dernier mois par Squad</th>
                        <th>Effort mobilisé</th>
                    </tr>
                </thead>
                <tbody>
                    {supports.map((support) => (
                        <tr key={support.id}>
                            <td>{support.ticketCount}</td>
                            <td>{support.effortSpent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Calcul: Pourcentage de l’effort mobilisé par rapport à la capacité de l’équipe (Somme de complexité /Vélocité)</p>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Top 3 des sujets en support N3</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        supports.map((support) => (
                            support.topSubjects.map((subject, index) => (
                                <tr key={index}>
                                    <td>{subject}</td>
                                </tr>
                            ))
                        ))}

                </tbody>
            </table>
        </div>
    )
}

export default SupportComponent