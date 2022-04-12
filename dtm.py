import time, pytz
from datetime import datetime, timezone

print('---NAIVE---')
now = int( time.time() )
now_ms = int( time.time_ns() / 1000 )
print('Unix Time (ms)          : %s' % now_ms )


print('---AWARE---')
# timestamp = 1614954621
dt = datetime.fromtimestamp(now, tz=timezone.utc)
print('UTC Time                : %s' % dt )

 
# Calling the now() function to
# get current date and time
localTime = datetime.now()
print('Local Time              : %s' % localTime) 

unix_timestamp = datetime.timestamp(localTime)*1000
print('Unix Timestamp(ms)      : %s' % unix_timestamp)


dtm_ms = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S.%f')[:-3]

print('Human Readable (with ms): %s' % dtm_ms)

# # adding a timezone
# timezone = pytz.timezone("US/Eastern")
# aware1 = timezone.localize(naive)
 
# # Calling the utcoffset() function
# # over the above localized time
# print("Time ahead of UTC by:", aware1.utcoffset())