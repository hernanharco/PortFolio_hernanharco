# 🚀 Pasos para Sincronizar tu Rama Local
Sigue estos tres pasos principales para asegurarte de que tu rama master local tenga todo lo que está en la master remota.

## 1. Cambia a la Rama master
Primero, asegúrate de que estás en la rama que quieres actualizar.

**Comando:** 
``` 
git checkout master
```

## 2. Obtén los Últimos Cambios Remotos
Usa git pull para descargar los cambios desde el repositorio remoto y combinarlos automáticamente en tu rama local actual (master).

**Comando:** 
```
git pull origin master
```
- origin: Es el nombre por defecto para tu repositorio remoto.

- master: Es la rama remota de la que quieres obtener los cambios.

**¿Qué hace** git pull?

git pull es en realidad una combinación de dos comandos:

1. git fetch: Descarga los datos más recientes del repositorio remoto, pero no los integra en tu código local.

2. git merge (o git rebase si está configurado): Combina esos datos descargados con tu rama local actual.

Después de ejecutar git pull origin master, tu rama master local debería estar completamente actualizada con los commits que ves en la página de Git, incluyendo el commit del merge del Pull Request.
__
# 🧐 Posible Causa Adicional
Revisando tus capturas de pantalla, veo que tienes ramas como abouthac y master. Es importante que el merge del Pull Request se haya hecho hacia la rama master en el remoto. Si ese fue el caso, el git pull debería solucionarlo.

Si después del git pull sigues sin ver los commits, es posible que el Visual Studio Code necesite un pequeño refresh de su vista de Git. A menudo, el simple hecho de ejecutar los comandos en el terminal ya lo actualiza, pero a veces necesitas recargar la ventana.

**Resumen de Comandos a usar en el terminal de Git:**

```
git checkout master
git pull origin master
```