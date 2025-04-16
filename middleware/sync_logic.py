from api_clients import api_mysql as mysql
from api_clients import api_sqlite as sqlite
from utils import select_primary_source

# Función para verificar si un estudiante ya existe
def exists_in_mysql(id):
    response = mysql.get_estudiante(id)
    return response and "id" in response

def exists_in_sqlite(id):
    response = sqlite.get_estudiante(id)
    return response and "id" in response
# Función para verificar si una asignatura ya existe
def exists_in_mysql2(id):
    response = mysql.get_asignatura(id)  # Aquí cambias de "get_estudiante" a "get_asignatura"
    return response and "idasignatura" in response  # Cambias "id" por "idasignatura"

def exists_in_sqlite2(id):
    response = sqlite.get_asignatura(id)  # Aquí cambias de "get_estudiante" a "get_asignatura"
    return response and "idasignatura" in response  # Cambias "id" por "idasignatura"

# --- Sincronización de Estudiantes ---
def sync_estudiantes():
    sqlite_data = sqlite.get_all_estudiantes()  # Obtener todos los estudiantes de SQLite
    mysql_data = mysql.get_all_estudiantes()  # Obtener todos los estudiantes de MySQL
    final_data = select_primary_source(sqlite_data, mysql_data)  # Selección de fuente principal (siempre la más reciente)

    if not final_data:
        print("No hay datos para sincronizar estudiantes.")
        return

    for est in final_data:
        # Si el estudiante no existe en MySQL, se inserta
        if not exists_in_mysql(est["id"]):
            try:
                est["flag_sync"] = False  # Marcar como no sincronizado
                mysql.create_estudiante(est)  # Insertar en MySQL
                print(f"Estudiante {est['id']} insertado en MySQL.")
            except Exception as e:
                print(f"Error al insertar estudiante en MySQL: {e}")
        
        # Si el estudiante no existe en SQLite, se inserta
        if not exists_in_sqlite(est["id"]):
            try:
                est["flag_sync"] = False  # Marcar como no sincronizado
                sqlite.create_estudiante(est)  # Insertar en SQLite
                print(f"Estudiante {est['id']} insertado en SQLite.")
            except Exception as e:
                print(f"Error al insertar estudiante en SQLite: {e}")
        
        # Si el estudiante está en ambas bases de datos, marcar como sincronizado
        if exists_in_mysql(est["id"]) and exists_in_sqlite(est["id"]):
            try:
                est["flag_sync"] = True  # Marcar como sincronizado
                mysql.update_estudiante(est)  # Actualizar en MySQL
                sqlite.update_estudiante(est)  # Actualizar en SQLite
                print(f"Estudiante {est['id']} sincronizado entre bases de datos.")
            except Exception as e:
                print(f"Error al sincronizar estudiante entre bases de datos: {e}")

# --- Sincronización de Profesores ---
def sync_profesores():
    sqlite_data = sqlite.get_all_profesores()
    mysql_data = mysql.get_all_profesores()
    final_data = select_primary_source(sqlite_data, mysql_data)

    if not final_data:
        print("No hay datos para sincronizar profesores.")
        return

    for prof in final_data:
        if not exists_in_mysql(prof["id"]):
            try:
                prof["flag_sync"] = False  # Marcar como no sincronizado
                mysql.create_profesor(prof)  # Insertar en MySQL
                print(f"Profesor {prof['id']} insertado en MySQL.")
            except Exception as e:
                print(f"Error al insertar profesor en MySQL: {e}")
        
        if not exists_in_sqlite(prof["id"]):
            try:
                prof["flag_sync"] = False  # Marcar como no sincronizado
                sqlite.create_profesor(prof)  # Insertar en SQLite
                print(f"Profesor {prof['id']} insertado en SQLite.")
            except Exception as e:
                print(f"Error al insertar profesor en SQLite: {e}")
        
        # Sincronización
        if exists_in_mysql(prof["id"]) and exists_in_sqlite(prof["id"]):
            try:
                prof["flag_sync"] = True  # Marcar como sincronizado
                mysql.update_profesor(prof)  # Actualizar en MySQL
                sqlite.update_profesor(prof)  # Actualizar en SQLite
                print(f"Profesor {prof['id']} sincronizado entre bases de datos.")
            except Exception as e:
                print(f"Error al sincronizar profesor entre bases de datos: {e}")

# --- Sincronización de Asignaturas ---
def sync_asignaturas():
    sqlite_data = sqlite.get_all_asignaturas()
    mysql_data = mysql.get_all_asignaturas()
    final_data = select_primary_source(sqlite_data, mysql_data)

    if not final_data:
        print("No hay datos para sincronizar asignaturas.")
        return

    for asig in final_data:
        # Cambiar "id" por "idasignatura" si esa es la clave correcta
        if not exists_in_mysql2(asig["idasignatura"]):
            try:
                asig["flag_sync"] = False  # Marcar como no sincronizado
                mysql.create_asignatura(asig)  # Insertar en MySQL
                print(f"Asignatura {asig['idasignatura']} insertada en MySQL.")
            except Exception as e:
                print(f"Error al insertar asignatura en MySQL: {e}")
        
        if not exists_in_sqlite2(asig["idasignatura"]):
            try:
                asig["flag_sync"] = False  # Marcar como no sincronizado
                sqlite.create_asignatura(asig)  # Insertar en SQLite
                print(f"Asignatura {asig['idasignatura']} insertada en SQLite.")
            except Exception as e:
                print(f"Error al insertar asignatura en SQLite: {e}")
        
        # Sincronización
        if exists_in_mysql2(asig["idasignatura"]) and exists_in_sqlite2(asig["idasignatura"]):
            try:
                asig["flag_sync"] = True  # Marcar como sincronizado
                mysql.update_asignatura(asig)  # Actualizar en MySQL
                sqlite.update_asignatura(asig)  # Actualizar en SQLite
                print(f"Asignatura {asig['idasignatura']} sincronizada entre bases de datos.")
            except Exception as e:
                print(f"Error al sincronizar asignatura entre bases de datos: {e}")

# --- Sincronización de Matrícula ---
def sync_matricula():
    sqlite_data = sqlite.get_all_matricula()
    mysql_data = mysql.get_all_matricula()
    final_data = select_primary_source(sqlite_data, mysql_data)

    if not final_data:
        print("No hay datos para sincronizar matrícula.")
        return

    for mat in final_data:
        if not exists_in_mysql(mat["id"]):
            try:
                mat["flag_sync"] = False  # Marcar como no sincronizado
                mysql.create_matricula(mat)  # Insertar en MySQL
                print(f"Matrícula {mat['id']} insertada en MySQL.")
            except Exception as e:
                print(f"Error al insertar matrícula en MySQL: {e}")
        
        if not exists_in_sqlite(mat["id"]):
            try:
                mat["flag_sync"] = False  # Marcar como no sincronizado
                sqlite.create_matricula(mat)  # Insertar en SQLite
                print(f"Matrícula {mat['id']} insertada en SQLite.")
            except Exception as e:
                print(f"Error al insertar matrícula en SQLite: {e}")
        
        # Sincronización
        if exists_in_mysql(mat["id"]) and exists_in_sqlite(mat["id"]):
            try:
                mat["flag_sync"] = True  # Marcar como sincronizado
                mysql.update_matricula(mat)  # Actualizar en MySQL
                sqlite.update_matricula(mat)  # Actualizar en SQLite
                print(f"Matrícula {mat['id']} sincronizada entre bases de datos.")
            except Exception as e:
                print(f"Error al sincronizar matrícula entre bases de datos: {e}")

# --- Sincronización de Profeciclo ---
def sync_profeciclo():
    sqlite_data = sqlite.get_all_profeciclo()
    mysql_data = mysql.get_all_profeciclo()
    final_data = select_primary_source(sqlite_data, mysql_data)

    if not final_data:
        print("No hay datos para sincronizar profeciclo.")
        return

    for pc in final_data:
        if not exists_in_mysql(pc["id"]):
            try:
                pc["flag_sync"] = False  # Marcar como no sincronizado
                mysql.create_profeciclo(pc)  # Insertar en MySQL
                print(f"Profeciclo {pc['id']} insertado en MySQL.")
            except Exception as e:
                print(f"Error al insertar profeciclo en MySQL: {e}")
        
        if not exists_in_sqlite(pc["id"]):
            try:
                pc["flag_sync"] = False  # Marcar como no sincronizado
                sqlite.create_profeciclo(pc)  # Insertar en SQLite
                print(f"Profeciclo {pc['id']} insertado en SQLite.")
            except Exception as e:
                print(f"Error al insertar profeciclo en SQLite: {e}")
        
        # Sincronización
        if exists_in_mysql(pc["id"]) and exists_in_sqlite(pc["id"]):
            try:
                pc["flag_sync"] = True  # Marcar como sincronizado
                mysql.update_profeciclo(pc)  # Actualizar en MySQL
                sqlite.update_profeciclo(pc)  # Actualizar en SQLite
                print(f"Profeciclo {pc['id']} sincronizado entre bases de datos.")
            except Exception as e:
                print(f"Error al sincronizar profeciclo entre bases de datos: {e}")

# --- Sincronización completa ---
def sync_all():
    print("Sincronizando estudiantes...")
    sync_estudiantes()
    print("Sincronizando profesores...")
    sync_profesores()
    print("Sincronizando asignaturas...")
    sync_asignaturas()
    print("Sincronizando matrícula...")
    sync_matricula()
    print("Sincronizando profeciclo...")
    sync_profeciclo()
    print("Sincronización completa.")
