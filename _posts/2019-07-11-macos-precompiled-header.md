---
layout: post
title: "[MacOS] 맥 터미널에서 bits/stdc++.h 헤더 사용하기"
categories: [setting]
tags: [mac]
redirect_from: /blog/macos-precompiled-header
---

bits/stdc++.h는 표준 라이브러리 전체를 모두 포함시키는 헤더입니다.

그래서 complie time에는 상당히 안 좋습니다.

반면에 헤더 하나만 포함하면 되기 때문에 빠르고 간결한 코드 작성이 가능합니다.

알고리즘 대회에서 중요한 것은 빠르고 정확한 코드작성, 실행 시간이기 때문에  채점서버가 이 기능을 지원하는 g++ 컴파일러를 쓴다면 이 헤더를 적극적으로 활용하는 편입니다.

아래의 링크에서 헤더의 소개와 장단점을 설명하고 있습니다

<https://www.geeksforgeeks.org/bitsstdc-h-c/>

연습할 때를 위해 local에서도 돌아가야하는데 mac os x terminal에서는 몇가지 작업이 필요합니다.

우선 gcc를 먼저 설치합니다. xcode를 먼저 설치하셨다면 같이 설치됩니다. 그러면 terminal 상에서 다음 명령어를 통해 설정 가능합니다.

```bash
cd /usr/local/include
mkdir bits
cd bits
vi stdc++.h
// stdc++.h파일에 하단 link를 참조하여 코드를 복사해서 붙여넣기 하면 됩니다
```

Linux GCC 4.8.0 /bits/stdc++.h header definition : <https://gist.github.com/eduarc/6022859>

-std=c++11 옵션으로 컴파일시 다음과 같은 에러가 뜬다면 bits/stdc++.h를 다음 link를 참조하여 수정하면 됩니다.

```bash
/usr/local/include/bits/stdc++.h:55:10: fatal error: 'cstdalign' file not found
#include <cstdalign>
         ^~~~~~~~~~~
1 error generated.
```

Linux GCC 4.8.0 /bits/stdc++.h header definition with \<cstdalign\> error fixed.

<https://gist.github.com/frankchen0130/9ac562b55fa7e03689bca30d0e52b0e5>
