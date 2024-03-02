import cv2

video = cv2.VideoCapture("rtsp://192.168.0.130:554/Streaming/Channels/301")

while True:
    _,frame = video.read()
    cv2.imshow("RTSP",frame)
    if cv2.waitKey(1) == ord('q'):
        break
video.release()
cv2.destroyAllWindows()