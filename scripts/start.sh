# @Author: Tlekbai Ali
# @Date:   2019-07-17 19:11:40
# @Last Modified by:   Tlekbai Ali
# @Last Modified time: 2019-08-20 11:33:54

app="alem-interview"

docker run -d --rm -p 1011:5000 \
	--name=${app} \
	atlekbai/${app}