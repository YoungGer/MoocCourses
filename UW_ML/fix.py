import ctypes, inspect, os, graphlab
from ctypes import wintypes
kernel32 = ctypes.WinDLL('kernel32', use_last_error=True)
kernel32.SetDllDirectoryW.argtypes = (wintypes.LPCWSTR,)
src_dir = os.path.split(inspect.getfile(graphlab))[0]
kernel32.SetDllDirectoryW(src_dir)

# Should work
graphlab.SArray(range(1000)).apply(lambda x: x)