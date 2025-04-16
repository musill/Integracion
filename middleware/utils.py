# utils.py

def select_primary_source(data_sqlite, data_mysql):
    # Si ambos tienen datos, elegimos el que tiene más "flag_sync" en True
    if isinstance(data_sqlite, list) and isinstance(data_mysql, list):
        count_sqlite = sum(1 for d in data_sqlite if d.get("flag_sync", False))
        count_mysql = sum(1 for d in data_mysql if d.get("flag_sync", False))
        
        if count_sqlite >= count_mysql:
            return data_sqlite
        else:
            return data_mysql
    elif data_sqlite:
        return data_sqlite
    elif data_mysql:
        return data_mysql
    return []
