import React, { useState, useEffect } from "react";
import styles from './TodoList.module.css'; // Importando estilos
import Icone from './assets/icon.png';

function TodoList() {
    const listaStorage = localStorage.getItem('Lista');

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");

    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista)); // Mantendo a chave como 'Lista'
    }, [lista]);

    function adicionaItem(form) {
        form.preventDefault();
        if (!novoItem) {
            return;
        }
        setLista([...lista, { text: novoItem, isCompleted: false }]); 
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }

    function clicou(index) {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index) {
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletaTudo() {
        setLista([]);
    }

    return (
        <div>
            <h1>To do List:</h1>
            <form onSubmit={adicionaItem}>
                <input
                    id="input-entrada"
                    type="text"
                    value={novoItem}
                    onChange={(e) => setNovoItem(e.target.value)}
                    placeholder="Add a task..."
                />
                <button className={styles.add} type="submit">Add</button>
            </form>
            <div className={styles.ListaTarefas}>
                <div style={{ textAlign: 'center' }}>
                    {lista.length < 1 
                        ? 
                        <img className="icone-central" src={Icone} alt="Nenhuma tarefa" />
                        : (
                        lista.map((item, index) => (
                            <div
                                key={index}
                                className={styles.item}
                            >
                                <span className={item.isCompleted ? styles.spanComplet : ""}
                                onClick={() => { clicou(index) }}>{item.text}</span>
                                <button onClick={() => deleta(index)} className={styles.del}>Delete</button>
                            </div>
                        ))
                    )}
                    {lista.length > 0 && (
                        <button onClick={() => deletaTudo()} className={styles.deleteAll}>Delete everything</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TodoList;
