import sys
from loguru import logger

def setup_logging():
    # デフォルトの登録（標準エラー出力への書き出し）を一度リセットします．
    logger.remove()

    # --noconsole 時は sys.stderr が None になるため, 存在する場合のみコンソール出力を追加します．
    if sys.stderr is not None:
        logger.add(sys.stderr, level="INFO")

   
    logger.add(
        "app.log", 
        rotation="10 MB", 
        level="DEBUG", 
        encoding="utf-8"
    )
    

    return logger



log = setup_logging()