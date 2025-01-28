import './History.scss'

import serveurClient from '../../assets/img/serveurClient.jpg';
import cuisine from '../../assets/img/cuisine.jpg';
import salle from '../../assets/img/salle.jpg';
import table from '../../assets/img/table.jpg';
import employe from '../../assets/img/employe.jpg';

const History = () => {
    return (
        <div className='historyContainer'>
            <img src={serveurClient} alt='serveurClient' className='historyImage' />
            <div className='history'>
                <h2 className='historyTitle'>ohmylunch</h2>
                <h3 className='historyText'>NOTRE RESTAURANT</h3>
                <span className='laCarteTypePlatsBarre'></span>

                <div className='historyCards'>
                    <div className='historyCard'>
                        <img src={cuisine} alt='plat' />
                        <p className='historyCardContent'>
                            Plongez dans un univers où la passion culinaire rencontre un service chaleureux et une ambiance conviviale. Notre restaurant est une ode aux saveurs authentiques et aux moments de partage.
                            Chaque plat raconte une histoire. Nous sélectionnons avec soin des ingrédients frais, locaux et de saison pour vous offrir une cuisine qui ravit les papilles et l’esprit. Que vous soyez amateur de [type de cuisine, ex. cuisine française raffinée, spécialités méditerranéennes, ou burgers gourmands], notre carte variée saura combler vos envies.
                        </p>
                    </div>

                    <div className='historyCardImages'>
                        <img src={salle} alt='plat' />
                        <img src={table} alt='plat' />
                    </div>

                    <div className='historyCard'>
                        <p className='historyCardContent2'>
                                Notre équipe est une véritable symphonie de talents où chaque métier joue un rôle essentiel : en cuisine, nos chefs et commis travaillent avec passion pour créer des plats savoureux et artistiques ; en salle, nos serveurs et responsables veillent à offrir un service impeccable et attentionné ; et en coulisses, nos gestionnaires, plongeurs et autres collaborateurs contribuent à faire fonctionner l’ensemble avec fluidité. Ensemble, nous partageons une même ambition : vous offrir une expérience culinaire mémorable, où professionnalisme, convivialité et passion se rencontrent.
                        </p>
                        <img src={employe} alt='plat' />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default History