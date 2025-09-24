import os
import traceback
from datetime import datetime

class Logger:
    LOG_FILE = 'system/log.log'

    @staticmethod
    def log_error(message: str) -> None:
        Logger._write_log("ERROR", message)

    @staticmethod
    def log(exc: BaseException) -> None:
        tb = traceback.TracebackException.from_exception(exc)
        last_frame = tb.stack[-1] if tb.stack else None

        message = (
            "Throwable:\n"
            f"Type: {type(exc).__name__}\n"
            f"Message: {str(exc)}\n"
            f"File: {last_frame.filename if last_frame else 'unknown'}\n"
            f"Line: {last_frame.lineno if last_frame else 'unknown'}\n"
            f"Trace:\n{''.join(tb.format())}"
        )

        Logger._write_log("Throwable", message)

    @staticmethod
    def _write_log(log_type: str, message: str) -> None:
        directory = os.path.dirname(Logger.LOG_FILE)

        if not os.path.exists(directory):
            os.makedirs(directory, exist_ok=True)

        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')[:-3]
        separator = '*' * 100
        entry = f"[{timestamp}] [{log_type}]\n{message}\n{separator}\n"

        with open(Logger.LOG_FILE, 'a', encoding='utf-8') as f:
            f.write(entry)