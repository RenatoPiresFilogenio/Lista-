"use client";
import { api } from "../services/api";
import style from "./page.module.scss";
import { useState, useEffect } from "react";
import { ClipboardX, ClipboardCheck, Check } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { getCookieClient } from "@/lib/getCookieClient";

interface Task {
  initialTaskName?: string;
}

interface TaskItem {
  id: string;
  name: string;
  done: boolean;
}

export default function Home({ initialTaskName = "" }: Task) {
  const [name, setTask] = useState(initialTaskName);
  const [taskList, listTask] = useState<TaskItem[]>([]);

  
  useEffect(() => {
    async function fetchTasks() {
      try {
        const token = await getCookieClient();
        const response = await api.get("/taskList", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const tasksFromApi = response.data;

        const formattedTasks = tasksFromApi.map((task: any) => ({
          id: task.id,
          name: task.name,
          done: task.done,
        }));

        listTask(formattedTasks);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    }

    fetchTasks();
  }, []);

  
  async function sendTask() {
    const token = await getCookieClient();

    if (!name.trim()) {
      alert("Tarefa precisa de nome");
      return;
    }

    try {
      const response = await api.post(
        "/Task",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const createdTask = response.data;

      listTask((prevList) => [...prevList, createdTask]);
      setTask("");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      alert("Erro ao criar tarefa");
    }
  }

  
  async function doneTask(taskId: string) {
    try {
      const token = await getCookieClient();

      await api.patch("/Task", {taskId}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      listTask((prevList) =>
        prevList.map((task) =>
          task.id === taskId ? { ...task, done: true } : task
        )
      );
    } catch (error) {
      console.error("Erro ao marcar tarefa como feita:", error);
    }
  }

 
  async function deleteTask(taskId: string) {
    try {
      const token = await getCookieClient();

      await api.delete("/Task", {
        data: { taskId },
        headers: { Authorization: `Bearer ${token}` }
      });

      listTask((prevList) => prevList.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  }

 
  async function killSession() {
    Cookies.remove("session", { path: "/" });
  }

  return (
    <main>
      <Link href="/">
        <button className={style.logoff} onClick={killSession}>
          Deslogar
        </button>
      </Link>

      <section className={style.mainSection}>
        <h1>Crie sua tarefa</h1>
        <div className={style.Container}>
          <input
            type="text"
            placeholder="Nome da tarefa"
            name="taskName"
            required
            value={name}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={sendTask}>
            <Check className={style.sendTask} size={20} />
          </button>
        </div>
      </section>

      <section className={style.taskList}>
        {taskList.map((item) => (
          <div
            key={item.id}
            className={`${style.Task} ${item.done ? style.taskDone : ""}`}
          >
            <p>{item.name}</p>
            <div className={style.actions}>
              <button
                className={style.iconButton}
                onClick={() => doneTask(item.id)}
                disabled={item.done}
              >
                <ClipboardCheck size={20} />
              </button>
              <button
                className={style.iconButtonDelete}
                onClick={() => deleteTask(item.id)}
              >
                <ClipboardX size={20} />
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
