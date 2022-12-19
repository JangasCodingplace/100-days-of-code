from pathlib import Path
from datetime import datetime
from dataclasses import dataclass


@dataclass
class TaskLog:
    project: str
    start_time: datetime
    end_time: datetime
    tag: str
    ticket: str
    description: str


class WorkTimeLogger:
    @classmethod
    def get_log_line(cls, log: TaskLog) -> str:
        return (
            f"project={log.project}\t"
            f"start_time={log.start_time.strftime('%Y-%m-%d %H:%M:%S')}\t"
            f"end_time={log.end_time.strftime('%Y-%m-%d %H:%M:%S')}\t"
            f"duration_in_seconds={(log.end_time - log.start_time).seconds}\t"
            f"tag={log.tag}\t"
            f"ticket={log.ticket}\t"
            f"description={log.description}\n"
        )
        
    @classmethod
    def get_log_by_date_directory(cls):
        current_path = Path(__file__).resolve().parent
        log_dir = (current_path / "logs" / "by_date")
        log_dir.mkdir(parents=True, exist_ok=True)
        return log_dir
        
    @classmethod
    def get_log_by_project_directory(cls):
        current_path = Path(__file__).resolve().parent
        log_dir = (current_path / "logs" / "by_project")
        log_dir.mkdir(parents=True, exist_ok=True)
        return log_dir

    @classmethod
    def write_log(cls, log: TaskLog):
        log_file_name = f'{log.start_time.strftime("%Y-%m-%d")}.log'
        log_line = cls.get_log_line(log=log)
        with open(cls.get_log_by_date_directory() / log_file_name, "a") as f:
            f.write(log_line)
        
        with open(cls.get_log_by_project_directory() / f"{log.project}.log", "a") as f:
            f.write(log_line)

    @classmethod
    def start_task(cls):
        current_project = input("Your Current Project > ")
        while True:
            start_time = datetime.now()
            description = input(
                "Add an description for the task or step, when it's done, "
                "type `c` for changing projects, "
                "type `q` for quitting \n >> "
            )
            if description != 'c' and description != 'q':
                tag = input("Add a Tag of your current task e.g. meeting or development > ")
                ticket = input("Add a Ticket ID or Link of your current task > ")

                end_time = datetime.now()
                task_log = TaskLog(
                    project=current_project,
                    start_time=start_time,
                    end_time=end_time,
                    tag=tag,
                    ticket=ticket,
                    description=description,
                )
                cls.write_log(task_log)
            elif description == 'c':
                # Dirty!
                return cls.start_task()
            else:
                return


if __name__ == "__main__":
    WorkTimeLogger.start_task()
