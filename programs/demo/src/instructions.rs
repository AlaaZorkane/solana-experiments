// Automatically generated rust module for 'instructions.proto' file

#![allow(non_snake_case)]
#![allow(non_upper_case_globals)]
#![allow(non_camel_case_types)]
#![allow(unused_imports)]
#![allow(unknown_lints)]
#![allow(clippy::all)]
#![cfg_attr(rustfmt, rustfmt_skip)]


use std::borrow::Cow;
use quick_protobuf::{MessageRead, MessageWrite, BytesReader, Writer, WriterBackend, Result};
use quick_protobuf::sizeofs::*;
use super::*;

#[derive(Debug, Default, PartialEq, Clone)]
pub struct DemoInstructionData<'a> {
    pub instruction_oneof: mod_DemoInstructionData::OneOfinstruction_oneof<'a>,
}

impl<'a> MessageRead<'a> for DemoInstructionData<'a> {
    fn from_reader(r: &mut BytesReader, bytes: &'a [u8]) -> Result<Self> {
        let mut msg = Self::default();
        while !r.is_eof() {
            match r.next_tag(bytes) {
                Ok(10) => msg.instruction_oneof = mod_DemoInstructionData::OneOfinstruction_oneof::echo(r.read_message::<EchoInstruction>(bytes)?),
                Ok(18) => msg.instruction_oneof = mod_DemoInstructionData::OneOfinstruction_oneof::add(r.read_message::<AddInstruction>(bytes)?),
                Ok(t) => { r.read_unknown(bytes, t)?; }
                Err(e) => return Err(e),
            }
        }
        Ok(msg)
    }
}

impl<'a> MessageWrite for DemoInstructionData<'a> {
    fn get_size(&self) -> usize {
        0
        + match self.instruction_oneof {
            mod_DemoInstructionData::OneOfinstruction_oneof::echo(ref m) => 1 + sizeof_len((m).get_size()),
            mod_DemoInstructionData::OneOfinstruction_oneof::add(ref m) => 1 + sizeof_len((m).get_size()),
            mod_DemoInstructionData::OneOfinstruction_oneof::None => 0,
    }    }

    fn write_message<W: WriterBackend>(&self, w: &mut Writer<W>) -> Result<()> {
        match self.instruction_oneof {            mod_DemoInstructionData::OneOfinstruction_oneof::echo(ref m) => { w.write_with_tag(10, |w| w.write_message(m))? },
            mod_DemoInstructionData::OneOfinstruction_oneof::add(ref m) => { w.write_with_tag(18, |w| w.write_message(m))? },
            mod_DemoInstructionData::OneOfinstruction_oneof::None => {},
    }        Ok(())
    }
}

pub mod mod_DemoInstructionData {

use super::*;

#[derive(Debug, PartialEq, Clone)]
pub enum OneOfinstruction_oneof<'a> {
    echo(EchoInstruction<'a>),
    add(AddInstruction),
    None,
}

impl<'a> Default for OneOfinstruction_oneof<'a> {
    fn default() -> Self {
        OneOfinstruction_oneof::None
    }
}

}

#[derive(Debug, Default, PartialEq, Clone)]
pub struct EchoInstruction<'a> {
    pub str_pb: Cow<'a, str>,
}

impl<'a> MessageRead<'a> for EchoInstruction<'a> {
    fn from_reader(r: &mut BytesReader, bytes: &'a [u8]) -> Result<Self> {
        let mut msg = Self::default();
        while !r.is_eof() {
            match r.next_tag(bytes) {
                Ok(10) => msg.str_pb = r.read_string(bytes).map(Cow::Borrowed)?,
                Ok(t) => { r.read_unknown(bytes, t)?; }
                Err(e) => return Err(e),
            }
        }
        Ok(msg)
    }
}

impl<'a> MessageWrite for EchoInstruction<'a> {
    fn get_size(&self) -> usize {
        0
        + if self.str_pb == "" { 0 } else { 1 + sizeof_len((&self.str_pb).len()) }
    }

    fn write_message<W: WriterBackend>(&self, w: &mut Writer<W>) -> Result<()> {
        if self.str_pb != "" { w.write_with_tag(10, |w| w.write_string(&**&self.str_pb))?; }
        Ok(())
    }
}

#[derive(Debug, Default, PartialEq, Clone)]
pub struct AddInstruction {
    pub a: i32,
    pub b: i32,
}

impl<'a> MessageRead<'a> for AddInstruction {
    fn from_reader(r: &mut BytesReader, bytes: &'a [u8]) -> Result<Self> {
        let mut msg = Self::default();
        while !r.is_eof() {
            match r.next_tag(bytes) {
                Ok(8) => msg.a = r.read_int32(bytes)?,
                Ok(16) => msg.b = r.read_int32(bytes)?,
                Ok(t) => { r.read_unknown(bytes, t)?; }
                Err(e) => return Err(e),
            }
        }
        Ok(msg)
    }
}

impl MessageWrite for AddInstruction {
    fn get_size(&self) -> usize {
        0
        + if self.a == 0i32 { 0 } else { 1 + sizeof_varint(*(&self.a) as u64) }
        + if self.b == 0i32 { 0 } else { 1 + sizeof_varint(*(&self.b) as u64) }
    }

    fn write_message<W: WriterBackend>(&self, w: &mut Writer<W>) -> Result<()> {
        if self.a != 0i32 { w.write_with_tag(8, |w| w.write_int32(*&self.a))?; }
        if self.b != 0i32 { w.write_with_tag(16, |w| w.write_int32(*&self.b))?; }
        Ok(())
    }
}
