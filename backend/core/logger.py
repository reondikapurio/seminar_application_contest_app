import sys
from loguru import logger

def setup_logging():
    """
    loggerの設定を行う関数
    """

    logger.remove()
    logger.add(
        sys.stdout,
        format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",   
        level="DEBUG",
    )
    return logger

log = setup_logging()