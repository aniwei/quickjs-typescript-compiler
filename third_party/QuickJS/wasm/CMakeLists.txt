cmake_minimum_required(VERSION 3.22.1)
project(quickjs_bytecode)

set(CMAKE_CXX_STANDARD 20)

file(GLOB SOURCES
    *.cpp
    *.h
)

add_subdirectory(${CMAKE_CURRENT_LIST_DIR}/../
    ${CMAKE_BINARY_DIR}/quickjs-build)
include_directories(${CMAKE_CURRENT_LIST_DIR}/../include)
set(LIBRARY_OUTPUT_PATH ${PROJECT_SOURCE_DIR}/lib)
set(EXECUTABLE_OUTPUT_PATH ${PROJECT_SOURCE_DIR}/output)

add_executable(quickjs_wasm ${SOURCES})
set_target_properties(quickjs_wasm PROPERTIES OUTPUT_NAME "quickjs_wasm")

target_link_options(quickjs_wasm PRIVATE
    -sEXPORT_NAME=QuickJSBytecode
    -sMODULARIZE=1
    -sEXPORT_ES6=0
    -sWASM=1
    -sENVIRONMENT=node
    -sALLOW_MEMORY_GROWTH=1
    -sINITIAL_MEMORY=268435456
    -sASSERTIONS=1
    -sNO_DISABLE_EXCEPTION_CATCHING
    -sMALLOC=emmalloc
    --bind
    --no-entry
)

target_link_libraries(quickjs_wasm PRIVATE quickjs-libc)

# Ensure dump bytecode utilities are compiled
target_compile_definitions(quickjs PRIVATE DUMP_BYTECODE=1)
target_compile_definitions(quickjs_wasm PRIVATE DUMP_BYTECODE=1)
