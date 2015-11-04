#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Usage:
#   Type './import-ggb.py <ggb-path>[ <output-path>[ <user-id>]]' to extract files and attributes from *.ggb.
# Author: Zhang Yungui <http://github.com/rhcad>, 2015.10.26

import os, sys, zipfile, json, random, base64
import xml.etree.ElementTree as ET

# Convert long integer to string.
def l2a(x):
    return repr(long(x))[0:-1]

# Get title and reference id from a file name
def get_title_refid(name):
    n = 0
    while n < len(name) and name[n].isdigit():
        n = n + 1
    return (name, None) if n < 7 or n == len(name) else (name[n:], name[0:n])

# Extract thumbnail file and attributes from a ggb file.
def scan_zip(fn, filename, info):
    def make_b64_filename(id):
        return os.path.join(info['path'], 'ggb64', '%ld.b64' % id)

    if not zipfile.is_zipfile(filename):
        print('Invalid zip file: %s' % filename)
        return
    ggb = zipfile.ZipFile(filename, 'r')
    try:
        info['count'] = info['count'] + 1
        (title,refid) = get_title_refid(fn[:-4])    # Remove the extension '.ggb'

        id = random.uniform(10000, 99999)
        while id in info['ids'] or (info['path'] and os.path.exists(make_b64_filename(id))):
            id = random.uniform(10000, 99999)
        info['ids'].append(id)

        kb = (os.path.getsize(filename) + 512) // 1024
        xml = ET.fromstring(ggb.read('geogebra.xml'))
        win = xml.findall('./gui/window')
        win = win[0].attrib if len(win) > 0 else {}
        print('%03d\t%ld\t%s\t%d KB\t%s x %s\t%s' % (info['count'], id, title, kb, win['width'], win['height'], info['user']))

        prop = { 'id': l2a(id),
                 'title': title,
                 'keys': list(info['keys']),
                 'user': info['user'],
                 'kb': kb,
                 'uid': xml.attrib['id'],
                 'format': xml.attrib['format'],
                 'width': win['width'],
                 'height': win['height']
        }
        if refid:
            prop['refid'] = refid

        if info['path']:
            thumbnail = ggb.read('geogebra_thumbnail.png')
            png_file = os.path.join(info['path'], 'thumbnail', '%ld.png' % id)
            open(png_file, 'wb').write(thumbnail)

            info['head'].append(prop)

            fin = open(filename, "rb")
            fout = open(make_b64_filename(id), "w")
            base64.encode(fin, fout)
            fin.close()
            fout.close()
    except KeyError:
        print 'ERROR: No thumbnail in %s' % filename
    ggb.close()

def scan_dir(src_dir, info):
    for fn in os.listdir(src_dir):
        filename = os.path.join(src_dir, fn)
        if fn[0]=='.' or fn[0]=='~' or fn=='ggb' or fn=='output':
            continue
        if os.path.isdir(filename):
            # Folder name which begins with two digits will be divided into user id and keyword.
            old_user = info['user']
            if len(fn) > 1 and fn[0].isdigit() and fn[1].isdigit() and (len(fn)==2 or not fn[2].isdigit()):
                info['user'] = fn[0:2]
                fn = fn[2:-1]
            if len(fn) > 0:
                info['keys'].append(fn)
            scan_dir(filename, info)
            if len(fn) > 0:
                info['keys'].pop()
            info['user'] = old_user
        elif fn.endswith('.ggb'):
            scan_zip(fn, filename, info)

if __name__=="__main__":
    def mkdir_needed(dir):
        if not os.path.exists(dir):
            os.mkdir(dir)

    src_dir = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.path.abspath('.')
    out_dir = os.path.abspath(sys.argv[2]) if len(sys.argv) > 2 else os.path.join(src_dir, 'ggbdata')
    index_file = os.path.join(out_dir, 'index.json')
    if os.path.exists(index_file):
        index_file = os.path.join(out_dir, 'index2.json')
    else:
        mkdir_needed(out_dir)
        mkdir_needed(os.path.join(out_dir, 'thumbnail'))
        mkdir_needed(os.path.join(out_dir, 'ggb64'))

    info = { 'path': out_dir, 'count': 0, 'head': [], 'ids': [], 'keys': [],
             'user': sys.argv[3] if len(sys.argv) > 3 else 11 }
    print('order\tid\ttitle\tKB\twidth x height\tuser')
    scan_dir(src_dir, info)
    if out_dir and info['count'] > 0:
        out_file = open(index_file, 'w')
        out_file.write(json.dumps(info['head'], ensure_ascii = False))
