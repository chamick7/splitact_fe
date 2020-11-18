
import { useDrag, useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowsAlt } from "@fortawesome/free-solid-svg-icons";


import style from "../../css/activity.module.css";

export default function Card({ card, group, changeGroup, findCard, moveCard }) {


    const [{ isDragging }, drag] = useDrag({
        item: { card: card, id:card.id , type: "card" },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            const { id: droppedId, originalIndex } = monitor.getItem();
            if(dropResult){
                if(dropResult.method === "changeGroup" && dropResult.group.name !== group.name){
                    changeGroup(dropResult.card, group,dropResult.group)
                }
            }
        },
    });


    const [, drop] = useDrop({
        accept: "card",
        hover({id: draggedId }){
            if(draggedId !== card.id){
                if(card.id){
                    const { card: newCard, index: overIndex } = findCard(group,card.id)
                    const { card: oldCard,  } = findCard(group, draggedId)
                    // console.log(oldCard);
                    // console.log(newCard);
                    moveCard(group, draggedId, overIndex, oldCard, newCard);
                }
            }
        },
        
    })

    const opacity = isDragging ? 0 : 1


    return (
        <div ref={(node) => drag(drop(node))} style={{ opacity }} className={style.card}>
            <div style={{ backgroundColor: "#FF672B" }} className={style.card_header}>
                <h3>{card.cardName}</h3>
                <span> 
                    <FontAwesomeIcon style={{ cursor: "move" }} icon={ faArrowsAlt }/> 
                    <FontAwesomeIcon icon={ faBars }/> 
                </span>
            </div>
            <div className={style.card_body}>
            </div>
        </div>
    );
}
